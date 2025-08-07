import Task from "./../models/task.js";
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(200).json({
    success: true,
    message: "Task Added Successfully.",
  });
};
