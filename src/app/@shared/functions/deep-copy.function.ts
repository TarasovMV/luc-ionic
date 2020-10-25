// TODO: change to real deep copy
export const deepCopy = <T>(ref): T => {
    return JSON.parse(JSON.stringify(ref));
};
