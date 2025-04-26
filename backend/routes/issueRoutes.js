const express = require('express');
const router = express.Router();
const {
  getAllIssues,
  createIssue,
  upvoteIssue,
  updateIssueStatus,
} = require('../controllers/issueController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', getAllIssues);
router.post('/', upload.single('image'), createIssue);
router.put('/:id/upvote', upvoteIssue);
router.put('/:id/status', updateIssueStatus);

module.exports = router;
