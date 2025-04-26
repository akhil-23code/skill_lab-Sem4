const Issue = require('../models/Issue');

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createIssue = async (req, res) => {
  try {
    const { title, description, category, location, priority } = req.body;
    const image = req.file ? req.file.path : '';
    const newIssue = new Issue({ title, description, category, location, priority, image });
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create issue' });
  }
};

exports.upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    issue.votes += 1;
    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upvote' });
  }
};

exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update status' });
  }
};
