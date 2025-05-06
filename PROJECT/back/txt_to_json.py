import json
import re

# Path to your input .txt and output .json
input_path = r"C:\Users\addan\Downloads\back\gemini.txt"
output_path = r"C:\Users\addan\Downloads\back\gemini.json"

# Read lines from the text file
with open(input_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

structured_data = []

for line in lines:
    line = line.strip()
    if line:
        # Extract the name before ' is ' (or fallback to first 30 chars)
        match = re.match(r"(.+?)\s+is\s+(?:a|an|the)?\s*", line, re.IGNORECASE)
        name = match.group(1).strip() if match else line[:30].strip()

        structured_data.append({
            "title": name,
            "text": line
        })

# Save to JSON file
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(structured_data, f, indent=2, ensure_ascii=False)

print(f"✅ Converted {len(structured_data)} entries to JSON format.")