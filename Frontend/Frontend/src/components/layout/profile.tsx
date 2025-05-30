import React, { useEffect, useState } from "react";

interface Student {
    name: string;
    rollNumber: string;
}

const Profile: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5501/api/students");
                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }
                const data: Student[] = await response.json();
                setStudents(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Student Profiles</h1>
            <ul className="space-y-2">
                {students.map((student, index) => (
                    <li
                        key={index}
                        className="p-4 border rounded shadow-sm bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p className="font-medium">Name: {student.name}</p>
                        <p className="text-sm text-gray-600">Roll Number: {student.rollNumber}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;