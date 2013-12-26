/**
 * Created with JetBrains WebStorm.
 * User: new-worker
 * Date: 13-12-25
 * Time: 下午3:15
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var postSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    date: {
        type: Date,
        default: Date.now,
        trim: true
    }
});

/**
 * Validations
 */
postSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

postSchema.path('content').validate(function(content) {
    return content.length;
}, 'Content cannot be blank');

postSchema.path('date').validate(function(date) {
    return date.length;
}, 'Date cannot be blank');

/**
 *Static methods
 */
postSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('title').exec(cb);
    }
};


mongoose.model('Post', postSchema);