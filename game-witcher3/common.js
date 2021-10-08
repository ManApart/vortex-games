"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DO_NOT_DEPLOY = exports.DO_NOT_DISPLAY = exports.LOCKED_PREFIX = exports.UNI_PATCH = exports.W3_TEMP_DATA_DIR = exports.CONFIG_MATRIX_REL_PATH = exports.I18N_NAMESPACE = exports.LOAD_ORDER_FILENAME = exports.MERGE_INV_MANIFEST = exports.SCRIPT_MERGER_ID = exports.PART_SUFFIX = exports.INPUT_XML_FILENAME = exports.GAME_ID = exports.getPriorityTypeBranch = exports.getLoadOrderFilePath = exports.getHash = exports.calcHashImpl = exports.MergeDataViolationError = exports.ResourceInaccessibleError = exports.MD5ComparisonError = void 0;
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const vortex_api_1 = require("vortex-api");
class MD5ComparisonError extends Error {
    constructor(message, file) {
        super(message);
        this.mPath = file;
    }
    get affectedFile() {
        return this.mPath;
    }
    get errorMessage() {
        return this.message + ': ' + this.mPath;
    }
}
exports.MD5ComparisonError = MD5ComparisonError;
class ResourceInaccessibleError extends Error {
    constructor(filePath, allowReport = false) {
        super(`"${filePath}" is being manipulated by another process`);
        this.mFilePath = filePath;
        this.mIsReportingAllowed = allowReport;
    }
    get isOneDrive() {
        const segments = this.mFilePath.split(path_1.default.sep)
            .filter(seg => !!seg)
            .map(seg => seg.toLowerCase());
        return segments.includes('onedrive');
    }
    get allowReport() {
        return this.mIsReportingAllowed;
    }
    get errorMessage() {
        return (this.isOneDrive)
            ? this.message + ': ' + 'probably by the OneDrive service.'
            : this.message + ': ' + 'close all applications that may be using this file.';
    }
}
exports.ResourceInaccessibleError = ResourceInaccessibleError;
class MergeDataViolationError extends Error {
    constructor(notIncluded, optional, collectionName) {
        super(`Merged script data for ${collectionName} is referencing missing/undeployed/optional mods`);
        this.name = 'MergeDataViolationError';
        this.mOptional = optional;
        this.mNotIncluded = notIncluded;
        this.mCollectionName = collectionName;
    }
    get Optional() {
        return this.mOptional;
    }
    get NotIncluded() {
        return this.mNotIncluded;
    }
    get CollectionName() {
        return this.mCollectionName;
    }
}
exports.MergeDataViolationError = MergeDataViolationError;
function calcHashImpl(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto_1.default.createHash('md5');
        const stream = vortex_api_1.fs.createReadStream(filePath);
        stream.on('readable', () => {
            const data = stream.read();
            if (data) {
                hash.update(data);
            }
        });
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
}
exports.calcHashImpl = calcHashImpl;
function getHash(filePath, tries = 3) {
    return calcHashImpl(filePath)
        .catch(err => {
        if (['EMFILE', 'EBADF'].includes(err['code']) && (tries > 0)) {
            return getHash(filePath, tries - 1);
        }
        else {
            return Promise.reject(err);
        }
    });
}
exports.getHash = getHash;
function getLoadOrderFilePath() {
    return path_1.default.join(vortex_api_1.util.getVortexPath('documents'), 'The Witcher 3', exports.LOAD_ORDER_FILENAME);
}
exports.getLoadOrderFilePath = getLoadOrderFilePath;
function getPriorityTypeBranch() {
    return ['settings', 'witcher3', 'prioritytype'];
}
exports.getPriorityTypeBranch = getPriorityTypeBranch;
exports.GAME_ID = 'witcher3';
exports.INPUT_XML_FILENAME = 'input.xml';
exports.PART_SUFFIX = '.part.txt';
exports.SCRIPT_MERGER_ID = 'W3ScriptMerger';
exports.MERGE_INV_MANIFEST = 'MergeInventory.xml';
exports.LOAD_ORDER_FILENAME = 'mods.settings';
exports.I18N_NAMESPACE = 'game-witcher3';
exports.CONFIG_MATRIX_REL_PATH = path_1.default.join('bin', 'config', 'r4game', 'user_config_matrix', 'pc');
exports.W3_TEMP_DATA_DIR = path_1.default.join(vortex_api_1.util.getVortexPath('temp'), 'W3TempData');
exports.UNI_PATCH = 'mod0000____CompilationTrigger';
exports.LOCKED_PREFIX = 'mod0000_';
exports.DO_NOT_DISPLAY = ['communitypatch-base'];
exports.DO_NOT_DEPLOY = ['readme.txt'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QixnREFBd0I7QUFDeEIsMkNBQXNDO0FBQ3RDLE1BQWEsa0JBQW1CLFNBQVEsS0FBSztJQUUzQyxZQUFZLE9BQU8sRUFBRSxJQUFJO1FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFkRCxnREFjQztBQUVELE1BQWEseUJBQTBCLFNBQVEsS0FBSztJQUdsRCxZQUFZLFFBQVEsRUFBRSxXQUFXLEdBQUcsS0FBSztRQUN2QyxLQUFLLENBQUMsSUFBSSxRQUFRLDJDQUEyQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBSSxDQUFDLEdBQUcsQ0FBQzthQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2FBQ3BCLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxtQ0FBbUM7WUFDM0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLHFEQUFxRCxDQUFDO0lBQ2hGLENBQUM7Q0FDSjtBQXpCRCw4REF5QkM7QUFFRCxNQUFhLHVCQUF3QixTQUFRLEtBQUs7SUFZaEQsWUFBWSxXQUFxQixFQUFFLFFBQWtCLEVBQUUsY0FBc0I7UUFDM0UsS0FBSyxDQUFDLDBCQUEwQixjQUFjLGtEQUFrRCxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxjQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQTtJQUM3QixDQUFDO0NBQ0Y7QUEvQkQsMERBK0JDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLFFBQVE7SUFDbkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxNQUFNLE1BQU0sR0FBRyxlQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBYkQsb0NBYUM7QUFFRCxTQUFnQixPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssR0FBRyxDQUFDO0lBQ3pDLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQztTQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUM1RCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFURCwwQkFTQztBQUVELFNBQWdCLG9CQUFvQjtJQUNsQyxPQUFPLGNBQUksQ0FBQyxJQUFJLENBQUMsaUJBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUUsZUFBZSxFQUFFLDJCQUFtQixDQUFDLENBQUM7QUFDMUYsQ0FBQztBQUZELG9EQUVDO0FBRUQsU0FBZ0IscUJBQXFCO0lBQ25DLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFGRCxzREFFQztBQUVZLFFBQUEsT0FBTyxHQUFHLFVBQVUsQ0FBQztBQUdyQixRQUFBLGtCQUFrQixHQUFHLFdBQVcsQ0FBQztBQUtqQyxRQUFBLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFFMUIsUUFBQSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUNwQyxRQUFBLGtCQUFrQixHQUFHLG9CQUFvQixDQUFDO0FBQzFDLFFBQUEsbUJBQW1CLEdBQUcsZUFBZSxDQUFDO0FBQ3RDLFFBQUEsY0FBYyxHQUFHLGVBQWUsQ0FBQztBQUNqQyxRQUFBLHNCQUFzQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFMUYsUUFBQSxnQkFBZ0IsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRXZFLFFBQUEsU0FBUyxHQUFHLCtCQUErQixDQUFDO0FBQzVDLFFBQUEsYUFBYSxHQUFHLFVBQVUsQ0FBQztBQUUzQixRQUFBLGNBQWMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDekMsUUFBQSxhQUFhLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGZzLCB1dGlsIH0gZnJvbSAndm9ydGV4LWFwaSc7XHJcbmV4cG9ydCBjbGFzcyBNRDVDb21wYXJpc29uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgcHJpdmF0ZSBtUGF0aDtcclxuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBmaWxlKSB7XHJcbiAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgIHRoaXMubVBhdGggPSBmaWxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFmZmVjdGVkRmlsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1QYXRoO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGVycm9yTWVzc2FnZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1lc3NhZ2UgKyAnOiAnICsgdGhpcy5tUGF0aDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUluYWNjZXNzaWJsZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gIHByaXZhdGUgbUlzUmVwb3J0aW5nQWxsb3dlZDtcclxuICBwcml2YXRlIG1GaWxlUGF0aDtcclxuICBjb25zdHJ1Y3RvcihmaWxlUGF0aCwgYWxsb3dSZXBvcnQgPSBmYWxzZSkge1xyXG4gICAgc3VwZXIoYFwiJHtmaWxlUGF0aH1cIiBpcyBiZWluZyBtYW5pcHVsYXRlZCBieSBhbm90aGVyIHByb2Nlc3NgKTtcclxuICAgIHRoaXMubUZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICB0aGlzLm1Jc1JlcG9ydGluZ0FsbG93ZWQgPSBhbGxvd1JlcG9ydDtcclxuICB9XHJcblxyXG4gIGdldCBpc09uZURyaXZlKCkge1xyXG4gICAgY29uc3Qgc2VnbWVudHMgPSB0aGlzLm1GaWxlUGF0aC5zcGxpdChwYXRoLnNlcClcclxuICAgICAgLmZpbHRlcihzZWcgPT4gISFzZWcpXHJcbiAgICAgIC5tYXAoc2VnID0+IHNlZy50b0xvd2VyQ2FzZSgpKTtcclxuICAgIHJldHVybiBzZWdtZW50cy5pbmNsdWRlcygnb25lZHJpdmUnKTtcclxuICB9XHJcblxyXG4gIGdldCBhbGxvd1JlcG9ydCgpIHtcclxuICAgIHJldHVybiB0aGlzLm1Jc1JlcG9ydGluZ0FsbG93ZWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgZXJyb3JNZXNzYWdlKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmlzT25lRHJpdmUpXHJcbiAgICAgID8gdGhpcy5tZXNzYWdlICsgJzogJyArICdwcm9iYWJseSBieSB0aGUgT25lRHJpdmUgc2VydmljZS4nXHJcbiAgICAgIDogdGhpcy5tZXNzYWdlICsgJzogJyArICdjbG9zZSBhbGwgYXBwbGljYXRpb25zIHRoYXQgbWF5IGJlIHVzaW5nIHRoaXMgZmlsZS4nO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVyZ2VEYXRhVmlvbGF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgLy8gTWVyZ2UgZGF0YSB2aW9sYXRpb24gZXJyb3JzIGludGVuZHMgdG8gY2F0ZXIgZm9yL2Jsb2NrIGN1cmF0b3JzXHJcbiAgLy8gIGZyb20gdXBsb2FkaW5nIGEgY29sbGVjdGlvbiB3aXRoIGZhdWx0eSBtZXJnZWQgZGF0YS5cclxuICAvLyBXZSBkZWZpbmUgZmF1bHR5IG1lcmdlZCBkYXRhIGFzOlxyXG4gIC8vICAxLiBBIG1lcmdlZCBzY3JpcHQgc2VnbWVudCB3aGljaCByZWxpZXMgb24gYSBjZXJ0YWluIG1vZCB0byBiZSBpbmNsdWRlZCBpbiB0aGVcclxuICAvLyAgICAgY29sbGVjdGlvbiwgeWV0IGl0IGlzIG5vdCBpbmNsdWRlZC5cclxuICAvLyAgMi4gQSBtZXJnZWQgc2NyaXB0IHNlZ21lbnQgd2hpY2ggcmVxdWlyZXMgYSBzcGVjaWZpYyBtb2QgdG8gYmUgaW5zdGFsbGVkLFxyXG4gIC8vICAgICB5ZXQgdGhlIGNvbGxlY3Rpb24gaGlnaGxpZ2h0ZWQgc2FpZCBtb2QgYXMgXCJvcHRpb25hbFwiOyBwb3RlbnRpYWxseVxyXG4gIC8vICAgICByZXN1bHRpbmcgaW4gdGhlIG1vZCBiZWluZyBtaXNzaW5nIG9uIHRoZSB1c2VyIGVuZC5cclxuICBwcml2YXRlIG1Ob3RJbmNsdWRlZDogc3RyaW5nW107XHJcbiAgcHJpdmF0ZSBtT3B0aW9uYWw6IHN0cmluZ1tdO1xyXG4gIHByaXZhdGUgbUNvbGxlY3Rpb25OYW1lOiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3Iobm90SW5jbHVkZWQ6IHN0cmluZ1tdLCBvcHRpb25hbDogc3RyaW5nW10sIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKGBNZXJnZWQgc2NyaXB0IGRhdGEgZm9yICR7Y29sbGVjdGlvbk5hbWV9IGlzIHJlZmVyZW5jaW5nIG1pc3NpbmcvdW5kZXBsb3llZC9vcHRpb25hbCBtb2RzYCk7XHJcbiAgICB0aGlzLm5hbWUgPSAnTWVyZ2VEYXRhVmlvbGF0aW9uRXJyb3InO1xyXG4gICAgdGhpcy5tT3B0aW9uYWwgPSBvcHRpb25hbDtcclxuICAgIHRoaXMubU5vdEluY2x1ZGVkID0gbm90SW5jbHVkZWQ7XHJcbiAgICB0aGlzLm1Db2xsZWN0aW9uTmFtZSA9IGNvbGxlY3Rpb25OYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBPcHRpb25hbCgpIHtcclxuICAgIHJldHVybiB0aGlzLm1PcHRpb25hbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgTm90SW5jbHVkZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tTm90SW5jbHVkZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IENvbGxlY3Rpb25OYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubUNvbGxlY3Rpb25OYW1lXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY0hhc2hJbXBsKGZpbGVQYXRoKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnbWQ1Jyk7XHJcbiAgICBjb25zdCBzdHJlYW0gPSBmcy5jcmVhdGVSZWFkU3RyZWFtKGZpbGVQYXRoKTtcclxuICAgIHN0cmVhbS5vbigncmVhZGFibGUnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBzdHJlYW0ucmVhZCgpO1xyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIGhhc2gudXBkYXRlKGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHN0cmVhbS5vbignZW5kJywgKCkgPT4gcmVzb2x2ZShoYXNoLmRpZ2VzdCgnaGV4JykpKTtcclxuICAgIHN0cmVhbS5vbignZXJyb3InLCByZWplY3QpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGFzaChmaWxlUGF0aCwgdHJpZXMgPSAzKSB7XHJcbiAgcmV0dXJuIGNhbGNIYXNoSW1wbChmaWxlUGF0aClcclxuICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBpZiAoWydFTUZJTEUnLCAnRUJBREYnXS5pbmNsdWRlcyhlcnJbJ2NvZGUnXSkgJiYgKHRyaWVzID4gMCkpIHtcclxuICAgICAgICByZXR1cm4gZ2V0SGFzaChmaWxlUGF0aCwgdHJpZXMgLSAxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2FkT3JkZXJGaWxlUGF0aCgpIHtcclxuICByZXR1cm4gcGF0aC5qb2luKHV0aWwuZ2V0Vm9ydGV4UGF0aCgnZG9jdW1lbnRzJyksICdUaGUgV2l0Y2hlciAzJywgTE9BRF9PUkRFUl9GSUxFTkFNRSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmlvcml0eVR5cGVCcmFuY2goKSB7XHJcbiAgcmV0dXJuIFsnc2V0dGluZ3MnLCAnd2l0Y2hlcjMnLCAncHJpb3JpdHl0eXBlJ107XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBHQU1FX0lEID0gJ3dpdGNoZXIzJztcclxuXHJcbi8vIEZpbGUgdXNlZCBieSBzb21lIG1vZHMgdG8gZGVmaW5lIGhvdGtleS9pbnB1dCBtYXBwaW5nXHJcbmV4cG9ydCBjb25zdCBJTlBVVF9YTUxfRklMRU5BTUUgPSAnaW5wdXQueG1sJztcclxuXHJcbi8vIFRoZSBXM01NIG1lbnUgbW9kIHBhdHRlcm4gc2VlbXMgdG8gZW5mb3JjZSBhIG1vZGRpbmcgcGF0dGVyblxyXG4vLyAgd2hlcmUge2ZpbGVuYW1lfS5wYXJ0LnR4dCBob2xkcyBhIGRpZmYgb2Ygd2hhdCBuZWVkcyB0byBiZVxyXG4vLyAgYWRkZWQgdG8gdGhlIG9yaWdpbmFsIGZpbGUgLSB3ZSdyZSBnb2luZyB0byB1c2UgdGhpcyBwYXR0ZXJuIGFzIHdlbGwuXHJcbmV4cG9ydCBjb25zdCBQQVJUX1NVRkZJWCA9ICcucGFydC50eHQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNDUklQVF9NRVJHRVJfSUQgPSAnVzNTY3JpcHRNZXJnZXInO1xyXG5leHBvcnQgY29uc3QgTUVSR0VfSU5WX01BTklGRVNUID0gJ01lcmdlSW52ZW50b3J5LnhtbCc7XHJcbmV4cG9ydCBjb25zdCBMT0FEX09SREVSX0ZJTEVOQU1FID0gJ21vZHMuc2V0dGluZ3MnO1xyXG5leHBvcnQgY29uc3QgSTE4Tl9OQU1FU1BBQ0UgPSAnZ2FtZS13aXRjaGVyMyc7XHJcbmV4cG9ydCBjb25zdCBDT05GSUdfTUFUUklYX1JFTF9QQVRIID0gcGF0aC5qb2luKCdiaW4nLCAnY29uZmlnJywgJ3I0Z2FtZScsICd1c2VyX2NvbmZpZ19tYXRyaXgnLCAncGMnKTtcclxuXHJcbmV4cG9ydCBjb25zdCBXM19URU1QX0RBVEFfRElSID0gcGF0aC5qb2luKHV0aWwuZ2V0Vm9ydGV4UGF0aCgndGVtcCcpLCAnVzNUZW1wRGF0YScpO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVOSV9QQVRDSCA9ICdtb2QwMDAwX19fX0NvbXBpbGF0aW9uVHJpZ2dlcic7XHJcbmV4cG9ydCBjb25zdCBMT0NLRURfUFJFRklYID0gJ21vZDAwMDBfJztcclxuXHJcbmV4cG9ydCBjb25zdCBET19OT1RfRElTUExBWSA9IFsnY29tbXVuaXR5cGF0Y2gtYmFzZSddO1xyXG5leHBvcnQgY29uc3QgRE9fTk9UX0RFUExPWSA9IFsncmVhZG1lLnR4dCddOyJdfQ==