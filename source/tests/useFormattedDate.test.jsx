import { renderHook } from "@testing-library/react";
import useFormattedDate, { formattedDate } from "../modules/hooks/useFormattedDate"; // Убедитесь, что путь к вашему хуку правильный

describe("useFormattedDate", () => {
    test("должен возвращать корректную строку даты для валидных миллисекунд", () => {
        const { result } = renderHook(() => useFormattedDate(1672531199000)); // 1 января 2023 года

        expect(result.current).toBe("1 янв. 2023 г.");
    });

    test("должен возвращать пустую строку для NaN", () => {
        const { result } = renderHook(() => useFormattedDate(NaN));

        expect(result.current).toBe("");
    });

    test("должен возвращать пустую строку для нечисловых значений", () => {
        const { result } = renderHook(() => useFormattedDate("тест"));

        expect(result.current).toBe("");
    });

    test("должен возвращать корректную строку даты для других валидных дат", () => {
        const { result } = renderHook(() => useFormattedDate(1672617600000)); // 2 января 2023 года

        expect(result.current).toBe("2 янв. 2023 г.");
    });

    test("должен обновлять значение при изменении входных данных", () => {
        const { result, rerender } = renderHook(({ milliseconds }) => useFormattedDate(milliseconds), {
            initialProps: { milliseconds: 1672531199000 }, // 1 января 2023 года
        });

        expect(result.current).toBe("1 янв. 2023 г.");

        rerender({ milliseconds: 1672617600000 }); // Изменяем на 2 января 2023 года

        expect(result.current).toBe("2 янв. 2023 г.");
    });
});

describe("formattedDate function", () => {
    test("должен возвращать корректную строку даты для валидных миллисекунд", () => {
        expect(formattedDate(1672531199000)).toBe("1 янв. 2023 г.");
    });

    test("должен возвращать пустую строку для NaN", () => {
        expect(formattedDate(NaN)).toBe("");
    });

    test("должен возвращать пустую строку для нечисловых значений", () => {
        expect(formattedDate("тест")).toBe("");
    });
});
