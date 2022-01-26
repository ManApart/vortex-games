"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModId = exports.genCollectionLoadOrder = exports.isModInCollection = exports.isValidMod = void 0;
const vortex_api_1 = require("vortex-api");
const util_1 = require("../util");
function isValidMod(mod) {
    return (mod !== undefined)
        && (mod.type !== 'collection');
}
exports.isValidMod = isValidMod;
function isModInCollection(collectionMod, mod) {
    if (collectionMod.rules === undefined) {
        return false;
    }
    return collectionMod.rules.find(rule => vortex_api_1.util.testModReference(mod, rule.reference)) !== undefined;
}
exports.isModInCollection = isModInCollection;
function genCollectionLoadOrder(loadOrder, mods, collection) {
    const sortedMods = loadOrder.filter(loId => {
        const modId = getModId(mods, loId);
        return (collection !== undefined)
            ? isValidMod(mods[modId]) && (isModInCollection(collection, mods[modId]))
            : isValidMod(mods[modId]);
    });
    return sortedMods;
}
exports.genCollectionLoadOrder = genCollectionLoadOrder;
function getModId(mods, loId) {
    return Object.keys(mods).find(modId => (0, util_1.transformId)(modId) === loId);
}
exports.getModId = getModId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXlDO0FBRXpDLGtDQUFzQztBQUV0QyxTQUFnQixVQUFVLENBQUMsR0FBZTtJQUN4QyxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQztXQUNyQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUhELGdDQUdDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsYUFBeUIsRUFBRSxHQUFlO0lBQzFFLElBQUksYUFBYSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDckMsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDckMsaUJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQzlELENBQUM7QUFQRCw4Q0FPQztBQUVELFNBQWdCLHNCQUFzQixDQUFDLFNBQW1CLEVBQ25CLElBQXFDLEVBQ3JDLFVBQXVCO0lBQzVELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQztZQUMvQixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBVkQsd0RBVUM7QUFFRCxTQUFnQixRQUFRLENBQUMsSUFBcUMsRUFBRSxJQUFZO0lBQzFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFBLGtCQUFXLEVBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUZELDRCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZXMsIHV0aWwgfSBmcm9tICd2b3J0ZXgtYXBpJztcclxuXHJcbmltcG9ydCB7IHRyYW5zZm9ybUlkIH0gZnJvbSAnLi4vdXRpbCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZE1vZChtb2Q6IHR5cGVzLklNb2QpIHtcclxuICByZXR1cm4gKG1vZCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgJiYgKG1vZC50eXBlICE9PSAnY29sbGVjdGlvbicpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNNb2RJbkNvbGxlY3Rpb24oY29sbGVjdGlvbk1vZDogdHlwZXMuSU1vZCwgbW9kOiB0eXBlcy5JTW9kKSB7XHJcbiAgaWYgKGNvbGxlY3Rpb25Nb2QucnVsZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNvbGxlY3Rpb25Nb2QucnVsZXMuZmluZChydWxlID0+XHJcbiAgICB1dGlsLnRlc3RNb2RSZWZlcmVuY2UobW9kLCBydWxlLnJlZmVyZW5jZSkpICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5Db2xsZWN0aW9uTG9hZE9yZGVyKGxvYWRPcmRlcjogc3RyaW5nW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHM6IHsgW21vZElkOiBzdHJpbmddOiB0eXBlcy5JTW9kIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24/OiB0eXBlcy5JTW9kKTogc3RyaW5nW10ge1xyXG4gIGNvbnN0IHNvcnRlZE1vZHMgPSBsb2FkT3JkZXIuZmlsdGVyKGxvSWQgPT4ge1xyXG4gICAgY29uc3QgbW9kSWQgPSBnZXRNb2RJZChtb2RzLCBsb0lkKTtcclxuICAgIHJldHVybiAoY29sbGVjdGlvbiAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICA/IGlzVmFsaWRNb2QobW9kc1ttb2RJZF0pICYmIChpc01vZEluQ29sbGVjdGlvbihjb2xsZWN0aW9uLCBtb2RzW21vZElkXSkpXHJcbiAgICAgIDogaXNWYWxpZE1vZChtb2RzW21vZElkXSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHNvcnRlZE1vZHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RJZChtb2RzOiB7IFttb2RJZDogc3RyaW5nXTogdHlwZXMuSU1vZCB9LCBsb0lkOiBzdHJpbmcpIHtcclxuICByZXR1cm4gT2JqZWN0LmtleXMobW9kcykuZmluZChtb2RJZCA9PiB0cmFuc2Zvcm1JZChtb2RJZCkgPT09IGxvSWQpO1xyXG59XHJcbiJdfQ==