import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageTitle from "../routes/PageTitle"; // Убедитесь, что путь к вашему компоненту правильный

describe("PageTitle", () => {
    beforeEach(() => {
        // Сбрасываем заголовок документа перед каждым тестом
        document.title = "";
    });

    test("должен устанавливать заголовок документа при монтировании", () => {
        render(
            <MemoryRouter>
                <PageTitle title="Test Page Title" />
            </MemoryRouter>
        );

        expect(document.title).toBe("Test Page Title"); // Проверяем, что заголовок установлен
    });

    test("должен обновлять заголовок документа при изменении title", () => {
        const { rerender } = render(
            <MemoryRouter>
                <PageTitle title="Initial Title" />
            </MemoryRouter>
        );

        expect(document.title).toBe("Initial Title"); // Проверяем начальный заголовок

        rerender(
            <MemoryRouter>
                <PageTitle title="Updated Title" />
            </MemoryRouter>
        );

        expect(document.title).toBe("Updated Title"); // Проверяем обновленный заголовок
    });

    test("должен обновлять заголовок при изменении маршрута", () => {
        const { rerender } = render(
            <MemoryRouter initialEntries={["/initial"]}>
                <PageTitle title="Initial Title" />
            </MemoryRouter>
        );

        expect(document.title).toBe("Initial Title"); // Проверяем начальный заголовок

        // Изменяем маршрут
        rerender(
            <MemoryRouter initialEntries={["/updated"]}>
                <PageTitle title="Updated Title" />
            </MemoryRouter>
        );

        expect(document.title).toBe("Updated Title"); // Проверяем обновленный заголовок
    });
});
