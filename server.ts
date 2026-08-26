import "dotenv/config";
import express from "express";
import { db } from "./lib/db";

const app = express();

app.use(express.json());

// Test route
app.get("/", (_req, res) => {
  res.json({
    message: "Facial Recognition Backend is running",
  });
});

// Get all users
app.get("/api/users", async (_req, res) => {
  try {
    const users = await db.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Create a user
app.post("/api/users", async (req, res) => {
  try {
    const { firstName, lastName, role, domain } = req.body;

    if (!firstName || !lastName || !role || !domain) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        role,
        domain,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create user",
    });
  }
});
// Create a face record for a user
app.post("/api/face-records", async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;

    if (!userId || !imageUrl) {
      return res.status(400).json({
        error: "userId and imageUrl are required",
      });
    }

    const faceRecord = await db.faceRecord.create({
      data: {
        userId,
        imageUrl,
      },
    });

    res.status(201).json(faceRecord);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create face record",
    });
  }
});
// Record attendance
app.post("/api/attendance", async (req, res) => {
  try {
    const { userId, status } = req.body;

    if (!userId || !status) {
      return res.status(400).json({
        error: "userId and status are required",
      });
    }

    const attendance = await db.attendance.create({
      data: {
        userId,
        status,
      },
    });

    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to record attendance",
    });
  }
});

// Get attendance records
app.get("/api/attendance", async (_req, res) => {
  try {
    const attendance = await db.attendance.findMany({
      include: {
        user: true,
      },
    });

    res.json(attendance);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch attendance",
    });
  }
});
// Attendance report
app.get("/api/reports", async (_req, res) => {
  try {
    const totalUsers = await db.user.count();

    const totalAttendance = await db.attendance.count();

    const present = await db.attendance.count({
      where: {
        status: "present",
      },
    });

    const absent = await db.attendance.count({
      where: {
        status: "absent",
      },
    });

    res.json({
      totalUsers,
      totalAttendance,
      present,
      absent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate report",
    });
  }
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});