
const showSuccess = (toast,summary, detail) => {
    toast.current.show({severity:'success', summary, detail, life: 3000});
}

const showInfo = (toast,summary, detail) => {
    toast.current.show({severity:'info', summary, detail, life: 3000});
}

const showWarn = (toast,summary, detail) => {
    toast.current.show({severity:'warn', summary, detail, life: 3000});
}

const showError = (toast,summary, detail) => {
    toast.current.show({severity:'error', summary, detail, life: 3000});
}

const showSecondary = (toast,summary, detail) => {
    toast.current.show({ severity: 'secondary', summary, detail, life: 3000 });
};

const showContrast = (toast,summary, detail) => {
    toast.current.show({ severity: 'contrast', summary, detail, life: 3000 });
};

export {
    showContrast,
    showError,
    showInfo,
    showSecondary,
    showWarn,
    showSuccess
}