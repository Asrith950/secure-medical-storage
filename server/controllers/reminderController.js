const Reminder = require('../models/Reminder');

// ✅ Create Reminder
exports.createReminder = async (req, res) => {
  try {
    const {
      medicineName,
      dosage,
      frequency,
      startDate,
      endDate,
      times,
      notes,
      isActive
    } = req.body;

    if (!medicineName || !dosage || !frequency || !startDate || !times || !times.length) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Convert "HH:mm" strings to actual Date objects for reminderTimes
    const reminderTimes = times.map(t => {
      const [hour, minute] = t.split(":").map(Number);
      const date = new Date(startDate);
      date.setHours(hour, minute, 0, 0);
      return date;
    });

    const reminder = await Reminder.create({
      user: req.user.id,
      title: medicineName, // ✅ Auto-title
      medicineDetails: {
        name: medicineName,
        dosage,
        frequency,
        instructions: notes || ""
      },
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      reminderTimes,
      active: isActive !== undefined ? isActive : true
    });

    return res.status(201).json({ success: true, data: reminder });

  } catch (error) {
    console.error("Reminder create error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get all reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reminders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Update reminder
exports.updateReminder = async (req, res) => {
  try {
    const updateFields = req.body;
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updateFields,
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    return res.status(200).json({ success: true, data: reminder });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Delete reminder
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    return res.status(200).json({ success: true, message: "Reminder deleted" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
