"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMixed = exports.testSupportedMixed = exports.installDLCMod = exports.testDLCMod = void 0;
const path_1 = __importDefault(require("path"));
const common_1 = require("./common");
function testDLCMod(files, gameId) {
    if (gameId !== common_1.GAME_ID) {
        return Promise.resolve({ supported: false, requiredFiles: [] });
    }
    const nonDlcFile = files.find(file => !file.startsWith('dlc'));
    return (nonDlcFile !== undefined)
        ? Promise.resolve({ supported: false, requiredFiles: [] })
        : Promise.resolve({ supported: true, requiredFiles: [] });
}
exports.testDLCMod = testDLCMod;
function installDLCMod(files) {
    const modNames = [];
    const setModTypeInstr = {
        type: 'setmodtype',
        value: 'witcher3dlc',
    };
    const instructions = files.reduce((accum, iter) => {
        if (path_1.default.extname(iter) === '') {
            return accum;
        }
        const segments = iter.split(path_1.default.sep);
        const properlyFormatted = segments.length > 2
            ? (segments[0].toLowerCase() === 'dlc') && ((segments[2] || '').toLowerCase() === 'content')
            : false;
        const modName = properlyFormatted
            ? segments[1]
            : segments[0];
        modNames.push(modName);
        const destination = properlyFormatted
            ? segments.slice(1).join(path_1.default.sep)
            : segments.join(path_1.default.sep);
        accum.push({
            type: 'copy',
            source: iter,
            destination,
        });
        return accum;
    }, [setModTypeInstr]);
    const modNamesAttr = {
        type: 'attribute',
        key: 'modComponents',
        value: modNames,
    };
    instructions.push(modNamesAttr);
    return Promise.resolve({ instructions });
}
exports.installDLCMod = installDLCMod;
function testSupportedMixed(files, gameId) {
    if (gameId !== common_1.GAME_ID) {
        return Promise.resolve({ supported: false, requiredFiles: [] });
    }
    const hasConfigMatrixFile = files.find(file => path_1.default.basename(file).toLowerCase() === common_1.CONFIG_MATRIX_REL_PATH) !== undefined;
    if (hasConfigMatrixFile) {
        return Promise.resolve({ supported: false, requiredFiles: [] });
    }
    const hasPrefix = (prefix, fileEntry) => {
        const segments = fileEntry.toLowerCase().split(path_1.default.sep);
        if (segments.indexOf('content') !== 1) {
            return false;
        }
        return (segments[0].length > 3) && (segments[0].startsWith(prefix));
    };
    const supported = ((files.find(file => hasPrefix('dlc', file)) !== undefined)
        && (files.find(file => hasPrefix('mod', file)) !== undefined));
    return Promise.resolve({
        supported,
        requiredFiles: [],
    });
}
exports.testSupportedMixed = testSupportedMixed;
function installMixed(files) {
    const modNames = [];
    const instructions = files.reduce((accum, iter) => {
        const segments = iter.split(path_1.default.sep);
        if (!path_1.default.extname(segments[segments.length - 1])) {
            return accum;
        }
        const modName = segments[0].startsWith('mod')
            ? segments[0] : undefined;
        const destination = (segments[0].startsWith('dlc'))
            ? ['dlc'].concat(segments).join(path_1.default.sep)
            : (modName !== undefined)
                ? ['mods'].concat(segments).join(path_1.default.sep)
                : undefined;
        if (destination !== undefined) {
            if (modName !== undefined) {
                modNames.push(modName);
            }
            const instruction = {
                type: 'copy',
                source: iter,
                destination,
            };
            accum.push(instruction);
        }
        return accum;
    }, [])
        .concat({
        type: 'attribute',
        key: 'modComponents',
        value: modNames,
    });
    return Promise.resolve({ instructions });
}
exports.installMixed = installMixed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluc3RhbGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXdCO0FBRXhCLHFDQUEyRDtBQUkzRCxTQUFnQixVQUFVLENBQUMsS0FBZSxFQUFFLE1BQWM7SUFDeEQsSUFBSSxNQUFNLEtBQUssZ0JBQU8sRUFBRTtRQUN0QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDMUQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFURCxnQ0FTQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxLQUFlO0lBQzNDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNwQixNQUFNLGVBQWUsR0FBdUI7UUFDMUMsSUFBSSxFQUFFLFlBQVk7UUFDbEIsS0FBSyxFQUFFLGFBQWE7S0FDckIsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUF5QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3RFLElBQUksY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDN0Is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QyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQzdCLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QjtZQUNELE1BQU0sV0FBVyxHQUF1QjtnQkFDdEMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLElBQUk7Z0JBQ1osV0FBVzthQUNaLENBQUM7WUFDRixLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ0wsTUFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLFdBQVc7UUFDakIsR0FBRyxFQUFFLGVBQWU7UUFDcEIsS0FBSyxFQUFFLFFBQVE7S0FDaEIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBbkNELG9DQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyB0eXBlcyB9IGZyb20gJ3ZvcnRleC1hcGknO1xyXG5pbXBvcnQgeyBDT05GSUdfTUFUUklYX1JFTF9QQVRILCBHQU1FX0lEIH0gZnJvbSAnLi9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgUHJlZml4VHlwZSA9ICdkbGMnIHwgJ21vZCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdERMQ01vZChmaWxlczogc3RyaW5nW10sIGdhbWVJZDogc3RyaW5nKTogUHJvbWlzZTx0eXBlcy5JU3VwcG9ydGVkUmVzdWx0PiB7XHJcbiAgaWYgKGdhbWVJZCAhPT0gR0FNRV9JRCkge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHN1cHBvcnRlZDogZmFsc2UsIHJlcXVpcmVkRmlsZXM6IFtdIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm9uRGxjRmlsZSA9IGZpbGVzLmZpbmQoZmlsZSA9PiAhZmlsZS5zdGFydHNXaXRoKCdkbGMnKSk7XHJcbiAgcmV0dXJuIChub25EbGNGaWxlICE9PSB1bmRlZmluZWQpXHJcbiAgICA/IFByb21pc2UucmVzb2x2ZSh7IHN1cHBvcnRlZDogZmFsc2UsIHJlcXVpcmVkRmlsZXM6IFtdIH0pXHJcbiAgICA6IFByb21pc2UucmVzb2x2ZSh7IHN1cHBvcnRlZDogdHJ1ZSwgcmVxdWlyZWRGaWxlczogW10gfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsRExDTW9kKGZpbGVzOiBzdHJpbmdbXSkge1xyXG4gIGNvbnN0IG1vZE5hbWVzID0gW107XHJcbiAgY29uc3Qgc2V0TW9kVHlwZUluc3RyOiB0eXBlcy5JSW5zdHJ1Y3Rpb24gPSB7XHJcbiAgICB0eXBlOiAnc2V0bW9kdHlwZScsXHJcbiAgICB2YWx1ZTogJ3dpdGNoZXIzZGxjJyxcclxuICB9O1xyXG4gIGNvbnN0IGluc3RydWN0aW9uczogdHlwZXMuSUluc3RydWN0aW9uW10gPSBmaWxlcy5yZWR1Y2UoKGFjY3VtLCBpdGVyKSA9PiB7XHJcbiAgICBpZiAocGF0aC5leHRuYW1lKGl0ZXIpID09PSAnJykge1xyXG4gICAgICByZXR1cm4gYWNjdW07XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZWdtZW50cyA9IGl0ZXIuc3BsaXQocGF0aC5zZXApO1xyXG4gICAgY29uc3QgcHJvcGVybHlGb3JtYXR0ZWQgPSBzZWdtZW50cy5sZW5ndGggPiAyXHJcbiAgICAgID8gKHNlZ21lbnRzWzBdLnRvTG93ZXJDYXNlKCkgPT09ICdkbGMnKSAmJiAoKHNlZ21lbnRzWzJdIHx8ICcnKS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudCcpXHJcbiAgICAgIDogZmFsc2U7XHJcbiAgICBjb25zdCBtb2ROYW1lID0gcHJvcGVybHlGb3JtYXR0ZWRcclxuICAgICAgPyBzZWdtZW50c1sxXVxyXG4gICAgICA6IHNlZ21lbnRzWzBdO1xyXG4gICAgbW9kTmFtZXMucHVzaChtb2ROYW1lKTtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcHJvcGVybHlGb3JtYXR0ZWRcclxuICAgICAgPyBzZWdtZW50cy5zbGljZSgxKS5qb2luKHBhdGguc2VwKVxyXG4gICAgICA6IHNlZ21lbnRzLmpvaW4ocGF0aC5zZXApO1xyXG4gICAgYWNjdW0ucHVzaCh7XHJcbiAgICAgIHR5cGU6ICdjb3B5JyxcclxuICAgICAgc291cmNlOiBpdGVyLFxyXG4gICAgICBkZXN0aW5hdGlvbixcclxuICAgIH0pXHJcbiAgICByZXR1cm4gYWNjdW07XHJcbiAgfSxbIHNldE1vZFR5cGVJbnN0ciBdKTtcclxuXHJcbiAgY29uc3QgbW9kTmFtZXNBdHRyOiB0eXBlcy5JSW5zdHJ1Y3Rpb24gPSB7XHJcbiAgICB0eXBlOiAnYXR0cmlidXRlJyxcclxuICAgIGtleTogJ21vZENvbXBvbmVudHMnLFxyXG4gICAgdmFsdWU6IG1vZE5hbWVzLFxyXG4gIH07XHJcbiAgaW5zdHJ1Y3Rpb25zLnB1c2gobW9kTmFtZXNBdHRyKTtcclxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgaW5zdHJ1Y3Rpb25zIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdFN1cHBvcnRlZE1peGVkKGZpbGVzOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lSWQ6IHN0cmluZyk6IFByb21pc2U8dHlwZXMuSVN1cHBvcnRlZFJlc3VsdD4ge1xyXG4gIGlmIChnYW1lSWQgIT09IEdBTUVfSUQpIHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBzdXBwb3J0ZWQ6IGZhbHNlLCByZXF1aXJlZEZpbGVzOiBbXSB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhhc0NvbmZpZ01hdHJpeEZpbGUgPSBmaWxlcy5maW5kKGZpbGUgPT5cclxuICAgIHBhdGguYmFzZW5hbWUoZmlsZSkudG9Mb3dlckNhc2UoKSA9PT0gQ09ORklHX01BVFJJWF9SRUxfUEFUSCkgIT09IHVuZGVmaW5lZDtcclxuICBpZiAoaGFzQ29uZmlnTWF0cml4RmlsZSkge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHN1cHBvcnRlZDogZmFsc2UsIHJlcXVpcmVkRmlsZXM6IFtdIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaGFzUHJlZml4ID0gKHByZWZpeDogUHJlZml4VHlwZSwgZmlsZUVudHJ5OiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHNlZ21lbnRzID0gZmlsZUVudHJ5LnRvTG93ZXJDYXNlKCkuc3BsaXQocGF0aC5zZXApO1xyXG4gICAgaWYgKHNlZ21lbnRzLmluZGV4T2YoJ2NvbnRlbnQnKSAhPT0gMSkge1xyXG4gICAgICAvLyBXZSBleHBlY3QgdGhlIGNvbnRlbnQgZm9sZGVyIHRvIGJlIG5lc3RlZCBvbmUgbGV2ZWwgYmVuZWF0aFxyXG4gICAgICAvLyAgdGhlIG1vZCdzIGZvbGRlciBlLmcuICdhcmNoaXZlLnppcC9kbGNNb2ROYW1lL2NvbnRlbnQvJyBvdGhlcndpc2VcclxuICAgICAgLy8gIGl0J3Mgc2ltcGx5IHRvbyB1bnJlbGlhYmxlIHRvIGF0dGVtcHQgdG8gZGV0ZWN0IHRoaXMgcGFja2FnaW5nIHBhdHRlcm4uXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKHNlZ21lbnRzWzBdLmxlbmd0aCA+IDMpICYmIChzZWdtZW50c1swXS5zdGFydHNXaXRoKHByZWZpeCkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHN1cHBvcnRlZCA9ICgoZmlsZXMuZmluZChmaWxlID0+IGhhc1ByZWZpeCgnZGxjJywgZmlsZSkpICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICYmIChmaWxlcy5maW5kKGZpbGUgPT4gaGFzUHJlZml4KCdtb2QnLCBmaWxlKSkgIT09IHVuZGVmaW5lZCkpO1xyXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xyXG4gICAgc3VwcG9ydGVkLFxyXG4gICAgcmVxdWlyZWRGaWxlczogW10sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsTWl4ZWQoZmlsZXM6IHN0cmluZ1tdKSB7XHJcbiAgLy8gV2UgY2FuIG9ubHkgYXNzdW1lIHRoYXQgZmlsZXMgd2l0aCB0aGUgJ2RsYycgcHJlZml4IGdvIGluc2lkZSBkbGMgYW5kIGZpbGVzXHJcbiAgLy8gIHdpdGggdGhlICdtb2QnIHByZWZpeCBnbyBpbnNpZGUgbW9kcy5cclxuICBjb25zdCBtb2ROYW1lczogc3RyaW5nW10gPSBbXTtcclxuICBjb25zdCBpbnN0cnVjdGlvbnM6IHR5cGVzLklJbnN0cnVjdGlvbltdID0gZmlsZXMucmVkdWNlKChhY2N1bSwgaXRlcikgPT4ge1xyXG4gICAgY29uc3Qgc2VnbWVudHMgPSBpdGVyLnNwbGl0KHBhdGguc2VwKTtcclxuICAgIGlmICghcGF0aC5leHRuYW1lKHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdKSkge1xyXG4gICAgICByZXR1cm4gYWNjdW07XHJcbiAgICB9XHJcbiAgICBjb25zdCBtb2ROYW1lID0gc2VnbWVudHNbMF0uc3RhcnRzV2l0aCgnbW9kJylcclxuICAgICAgPyBzZWdtZW50c1swXSA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gKHNlZ21lbnRzWzBdLnN0YXJ0c1dpdGgoJ2RsYycpKVxyXG4gICAgICA/IFsnZGxjJ10uY29uY2F0KHNlZ21lbnRzKS5qb2luKHBhdGguc2VwKVxyXG4gICAgICA6IChtb2ROYW1lICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgPyBbJ21vZHMnXS5jb25jYXQoc2VnbWVudHMpLmpvaW4ocGF0aC5zZXApXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoZGVzdGluYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAobW9kTmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbW9kTmFtZXMucHVzaChtb2ROYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbjogdHlwZXMuSUluc3RydWN0aW9uID0ge1xyXG4gICAgICAgIHR5cGU6ICdjb3B5JyxcclxuICAgICAgICBzb3VyY2U6IGl0ZXIsXHJcbiAgICAgICAgZGVzdGluYXRpb24sXHJcbiAgICAgIH07XHJcbiAgICAgIGFjY3VtLnB1c2goaW5zdHJ1Y3Rpb24pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjY3VtO1xyXG4gIH0sIFtdKVxyXG4gIC5jb25jYXQoe1xyXG4gICAgdHlwZTogJ2F0dHJpYnV0ZScsXHJcbiAgICBrZXk6ICdtb2RDb21wb25lbnRzJyxcclxuICAgIHZhbHVlOiBtb2ROYW1lcyxcclxuICB9KTtcclxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgaW5zdHJ1Y3Rpb25zIH0pO1xyXG59XHJcbiJdfQ==