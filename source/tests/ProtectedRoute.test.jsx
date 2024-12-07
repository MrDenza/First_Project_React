import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ProtectedRoute from "../routes/ProtectedRoute"; // Убедитесь, что путь к вашему компоненту правильный
import userReducer from "../redux/reducers/userData/userDataSlice"; // Импортируйте ваш редюсер

// Создаем моковый Redux store
const renderWithRedux = (component, { initialState, store = createStore(userReducer, initialState) } = {}) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
};

describe("ProtectedRoute", () => {
    test("должен перенаправлять на страницу входа, если пользователь не авторизован", () => {
        const initialState = { userData: { userIsAuth: false } };

        renderWithRedux(
            <MemoryRouter initialEntries={["/protected"]}>
                <Routes>
                    <Route path="/protected" element={<ProtectedRoute uriLogin="/auth/sign-in" />} />
                    <Route path="/auth/sign-in" element={<div>Sign In Page</div>} />
                </Routes>
            </MemoryRouter>,
            { initialState }
        );

        expect(screen.getByText(/sign in page/i)).toBeInTheDocument(); // Проверяем, что мы на странице входа
    });

    test("должен рендерить дочерние маршруты, если пользователь авторизован", () => {
        const initialState = { userData: { userIsAuth: true } };

        renderWithRedux(
            <MemoryRouter initialEntries={["/protected"]}>
                <Routes>
                    <Route path="/protected" element={<ProtectedRoute uriLogin="/auth/sign-in" />}>
                        <Route path="" element={<div>Protected Content</div>} />
                    </Route>
                    <Route path="/auth/sign-in" element={<div>Sign In Page</div>} />
                </Routes>
            </MemoryRouter>,
            { initialState }
        );

        expect(screen.getByText(/protected content/i)).toBeInTheDocument(); // Проверяем, что защищенный контент отображается
    });
});
