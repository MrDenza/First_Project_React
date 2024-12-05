import { useMemo } from "react";

const func = (milliseconds) => {
    if (isNaN(milliseconds)) {
        return "";
    }
    const date = new Date(milliseconds);

    const months = ["янв.", "фев.", "мар.", "апр.", "май", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек."];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year} г.`;
};

function useFormattedDate(milliseconds) {
    return useMemo(() => {
        return func(milliseconds);
    }, [milliseconds]);
}

export default useFormattedDate;
export { func as formattedDate };
