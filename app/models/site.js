/**
 * Created with JetBrains WebStorm.
 * User: new-worker
 * Date: 13-12-23
 * Time: 下午4:52
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var siteSchema = new Schema({
    owner: {
        type: String,
        default: '',
        trim: true
    },
    telephone: {
        type: String,
        default: '',
        trim: true
    },
    address: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
siteSchema.path('owner').validate(function(owner) {
    return owner.length;
}, 'Owner cannot be blank');

siteSchema.path('telephone').validate(function(telephone) {
    return telephone.length;
}, 'Telephone cannot be blank');

siteSchema.path('address').validate(function(address) {
    return address.length;
}, 'Address cannot be blank');

siteSchema.path('email').validate(function(email) {
    return email.length;
}, 'Email cannot be blank');

mongoose.model('Site', siteSchema);