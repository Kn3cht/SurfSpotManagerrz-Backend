var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { authorize } from "../auth/index.js";
import { SurfSpotModel } from "../mongodb/models/SurfSpotModel.js";
import { UserModel } from "../mongodb/models/UserModel.js";
export var surfSpotResolver = {
    Query: {
        listSurfSpots: function (_, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                userId = authorize(context);
                return [2 /*return*/, SurfSpotModel.find({ userId: userId })];
            });
        }); },
        getSurfSpot: function (_, _a, context) {
            var _id = _a._id;
            return __awaiter(void 0, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_b) {
                    userId = authorize(context);
                    return [2 /*return*/, SurfSpotModel.findOne({ _id: _id, userId: userId })];
                });
            });
        },
    },
    Mutation: {
        createOrUpdateSurfSpot: function (_, _a, context) {
            var surfSpot = _a.surfSpot;
            return __awaiter(void 0, void 0, void 0, function () {
                var userId, surfSpotDb;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = authorize(context);
                            surfSpotDb = __assign(__assign({}, surfSpot), { userId: userId });
                            if (surfSpotDb._id) {
                                return [2 /*return*/, SurfSpotModel.findOneAndUpdate({ _id: surfSpot._id, userId: userId }, surfSpotDb, { new: true })];
                            }
                            return [4 /*yield*/, new SurfSpotModel(surfSpotDb).save()];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        deleteSurfSpot: function (_, _a) {
            var _id = _a._id;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, SurfSpotModel.findOneAndDelete({ _id: _id }, { new: true })];
                        case 1: return [2 /*return*/, (_b.sent())._id];
                    }
                });
            });
        },
    },
    SurfSpot: {
        user: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, UserModel.findOne({ _id: parent.userId })];
            });
        }); },
    },
};
