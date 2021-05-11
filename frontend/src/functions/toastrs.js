import { toastr } from "react-redux-toastr";

export const toastrSuccess = (title, message = "", timeOut = 1500) => {
	const options = { timeOut, icon: "success" };
	toastr.success(title, message, options);
};

export const toastrError = (title, message = "", timeOut = 1500) => {
	const options = { timeOut, icon: "error" };
	toastr.error(title, message, options);
};

export const toastrWarning = (title, message = "", timeOut = 1500) => {
	const options = { timeOut, icon: "warning" };
	toastr.warning(title, message, options);
};

export const toastrInfo = (title, message = "", timeOut = 1500) => {
	const options = { timeOut, icon: "info" };
	toastr.info(title, message, options);
};
