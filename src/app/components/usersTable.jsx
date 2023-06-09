import React from "react";
import PropTypes from "prop-types";
import Table from "./table";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import { Link } from "react-router-dom";

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete }) => {
    const columns = { // устанавливаем параметры чтобы в tableHeadr отображать их динамически
        name: { path: "name", name: "Имя", component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link> }, // добавляем метод который возвращает имя юзера и ссылку
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities} />) },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретились/раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark // вставляем компонент как метод в columns
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <>
            <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />
        </>
    );
};

UserTable.propTypes = {
    users: PropTypes.array,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
