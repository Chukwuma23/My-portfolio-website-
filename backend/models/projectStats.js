// models/projectStats.js - More flexible version
import mongoose from 'mongoose';

const projectStatsSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
    // Remove enum to allow any project ID
    trim: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  uniqueVisitors: [{
    ipAddress: {
      type: String,
      required: true
    },
    lastVisit: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Create indexes for better query performance
projectStatsSchema.index({ projectId: 1 }, { unique: true });
projectStatsSchema.index({ views: -1 });
projectStatsSchema.index({ likes: -1 });

// Add a method to increment views
projectStatsSchema.methods.incrementViews = async function(ipAddress) {
  // Check if this is a unique visitor
  const existingVisitor = this.uniqueVisitors.find(v => v.ipAddress === ipAddress);
  
  if (!existingVisitor) {
    this.uniqueVisitors.push({ ipAddress, lastVisit: new Date() });
    this.views += 1;
  } else {
    existingVisitor.lastVisit = new Date();
  }
  
  return this.save();
};

// Add a method to increment likes
projectStatsSchema.methods.incrementLikes = async function() {
  this.likes += 1;
  return this.save();
};

export default mongoose.model('ProjectStats', projectStatsSchema);