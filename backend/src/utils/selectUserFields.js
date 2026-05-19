/**
 * selectUserFields.js
 *
 * A reusable Mongoose field-selection string for user documents.
 *
 * Why this exists:
 *   Multiple places in the codebase fetch user documents and need to
 *   return the same safe subset of fields (i.e. never the password hash).
 *   Centralising the selection string here means the list of "public"
 *   user fields is defined in exactly one place — easy to extend later.
 *
 * Usage (in a service):
 *   const user = await User.findById(id).select(USER_PUBLIC_FIELDS);
 *
 * Usage (with populate):
 *   await comment.populate("user", USER_PUBLIC_FIELDS);
 */

/**
 * Space-separated list of fields that are safe to return to the client.
 * The leading "-password" notation tells Mongoose to exclude that field;
 * everything else listed is explicitly included.
 *
 * Fields returned:
 *   name    — display name
 *   email   — contact / identity
 *   bio     — short user bio
 *   avatar  — profile picture URL
 *   role    — user | admin (needed for frontend permission checks)
 *   createdAt — account age / member since
 */
const USER_PUBLIC_FIELDS = "name email bio avatar role createdAt";

module.exports = { USER_PUBLIC_FIELDS };
