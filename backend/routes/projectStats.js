// routes/projectStats.js
import express from 'express';
import ProjectStats from '../models/projectStats.js';

const router = express.Router();

// Helper function to normalize project ID
function normalizeProjectId(inputId, projectName) {
  // Map of various IDs to canonical IDs
  const idMap = {
    'blog': 'blog',
    'blog-Website': 'blog',
    'blog-Website-btn': 'blog',
    'marinetime': 'Marinetime Union Website',
    'Union-Website': 'Marinetime Union Website',
    'Union-Website-btn': 'Marinetime Union Website',
    'Marinetime Union Website': 'Marinetime Union Website',
    'chatbot': 'chatbot',
    'chatbot-btn': 'chatbot',
    'ecommerce': 'ecommerce',
    'word-puzzy': 'Word puzzy',
    'word-puzzy-btn': 'Word puzzy',
    'Word puzzy': 'Word puzzy',
    'chuks-ai': 'chuks AI',
    'chuks-ai-btn': 'chuks AI',
    'chuks AI': 'chuks AI'
  };
  
  // If we have a mapping, use it
  if (idMap[inputId]) {
    return idMap[inputId];
  }
  
  // If we have a project name, use that
  if (projectName) {
    return projectName;
  }
  
  // Otherwise return the input as is
  return inputId;
}

// Track view for a project
router.post('/track-view', async (req, res) => {
  try {
    console.log('Track view request body:', req.body);
    
    let { projectId, projectName, visitorIp } = req.body;
    
    // Normalize the project ID
    const normalizedId = normalizeProjectId(projectId, projectName);
    
    if (!normalizedId) {
      return res.status(400).json({
        success: false,
        message: 'projectId is required'
      });
    }
    
    // Get client IP if not provided
    const ipAddress = visitorIp || req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    
    // Find or create project stats
    let stats = await ProjectStats.findOne({ projectId: normalizedId });
    
    if (!stats) {
      stats = new ProjectStats({
        projectId: normalizedId,
        projectName: projectName || normalizedId,
        views: 1,
        uniqueVisitors: [{ ipAddress, lastVisit: new Date() }]
      });
    } else {
      // Check if this is a unique visitor
      const existingVisitor = stats.uniqueVisitors.find(v => v.ipAddress === ipAddress);
      
      if (!existingVisitor) {
        stats.uniqueVisitors.push({ ipAddress, lastVisit: new Date() });
        stats.views += 1;
      } else {
        existingVisitor.lastVisit = new Date();
      }
    }
    
    await stats.save();
    
    res.json({
      success: true,
      views: stats.views,
      uniqueVisitors: stats.uniqueVisitors.length,
      projectId: normalizedId,
      message: 'View tracked successfully'
    });
    
  } catch (error) {
    console.error('Track view error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track view',
      error: error.message
    });
  }
});

// Track like for a project
router.post('/track-like', async (req, res) => {
  try {
    console.log('Track like request body:', req.body);
    
    let { projectId } = req.body;
    
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'projectId is required in request body'
      });
    }
    
    // Normalize the project ID
    const normalizedId = normalizeProjectId(projectId);
    
    console.log(`Normalized project ID: ${projectId} -> ${normalizedId}`);
    
    // Find or create project stats
    let stats = await ProjectStats.findOne({ projectId: normalizedId });
    
    if (!stats) {
      stats = new ProjectStats({
        projectId: normalizedId,
        projectName: normalizedId,
        likes: 1,
        views: 0,
        uniqueVisitors: []
      });
    } else {
      stats.likes += 1;
    }
    
    await stats.save();
    
    res.json({
      success: true,
      likes: stats.likes,
      projectId: normalizedId,
      message: 'Like tracked successfully'
    });
    
  } catch (error) {
    console.error('Track like error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track like',
      error: error.message
    });
  }
});

// Get project statistics
router.get('/stats/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const normalizedId = normalizeProjectId(projectId);
    
    const stats = await ProjectStats.findOne({ projectId: normalizedId });
    
    if (!stats) {
      return res.json({
        success: true,
        views: 0,
        likes: 0,
        uniqueVisitors: 0,
        projectId: normalizedId
      });
    }
    
    res.json({
      success: true,
      views: stats.views,
      likes: stats.likes,
      uniqueVisitors: stats.uniqueVisitors.length,
      projectId: stats.projectId
    });
    
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics'
    });
  }
});

// Get all project stats
router.get('/all-stats', async (req, res) => {
  try {
    const stats = await ProjectStats.find().sort({ views: -1 });
    
    res.json({
      success: true,
      stats: stats.map(stat => ({
        projectId: stat.projectId,
        projectName: stat.projectName,
        views: stat.views,
        likes: stat.likes,
        uniqueVisitors: stat.uniqueVisitors.length
      }))
    });
    
  } catch (error) {
    console.error('Get all stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics'
    });
  }
});

// Get top projects
router.get('/top/:limit', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 5;
    
    const topViewed = await ProjectStats.find()
      .sort({ views: -1 })
      .limit(limit);
    
    const topLiked = await ProjectStats.find()
      .sort({ likes: -1 })
      .limit(limit);
    
    res.json({
      success: true,
      topViewed: topViewed.map(p => ({
        projectId: p.projectId,
        views: p.views
      })),
      topLiked: topLiked.map(p => ({
        projectId: p.projectId,
        likes: p.likes
      }))
    });
    
  } catch (error) {
    console.error('Get top projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get top projects'
    });
  }
});

export default router;