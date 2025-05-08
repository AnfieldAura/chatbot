from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(message)s')

# Flask app setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def get_attendance(roll_number):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless=new")  # New headless mode
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=chrome_options
    )

    try:
        logging.info("Opening Spectra portal...")
        driver.get("https://spectra-beta.vercel.app/search")

        # Locate the search box and enter the roll number
        search_box = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.TAG_NAME, "input"))
        )
        logging.info(f"Entering roll number: {roll_number}")
        search_box.send_keys(roll_number)
        search_box.send_keys(Keys.RETURN)

        # Wait for the roll number element to be visible and click it
        roll_element = WebDriverWait(driver, 15).until(
            EC.visibility_of_element_located((By.XPATH, f"//p[contains(text(), '{roll_number}')]"))
        )
        roll_element.click()

        # Fetch the attendance information
        attendance_element = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//span[contains(@class, 'text-blue-600')]"))
        )
        attendance = attendance_element.text

        logging.info(f"Attendance for {roll_number}: {attendance}")
        return {"roll_number": roll_number, "attendance": attendance}

    except Exception as e:
        driver.save_screenshot("error.png")  # Save screenshot for debugging
        logging.error(f"Error fetching attendance: {e}")
        return {"error": f"Could not fetch attendance for {roll_number}"}
    finally:
        driver.quit()
        logging.info("WebDriver closed.")

@app.route('/get-attendance', methods=['POST'])
def attendance_api():
    data = request.get_json()
    roll_number = data.get('roll_number')

    if not roll_number:
        return jsonify({"error": "Roll number is required"}), 400

    result = get_attendance(roll_number)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
