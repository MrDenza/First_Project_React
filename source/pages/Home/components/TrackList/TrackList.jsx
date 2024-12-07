import { memo, useState, useMemo } from "react";
import { formattedDate } from "../../../../modules/hooks/useFormattedDate";
import HeaderList from "../HeaderList/HeaderList";
import "./TrackList.css";
import { Separator, Skeleton, Table, Select, Button } from "@radix-ui/themes";
import { iconTime } from "../../../../elements/iconPageHome";

import { eventFlow } from "../../../../modules/events/eventEmitter";
import { PAGE_HOME_ALBUM } from "../../../../routes/PagesRouter";

const skelet = <Skeleton width="100%" height="100%" />;

const DATE_SORT = "date";
const TITLE_SORT = "title";
const TYPE_SORT_ASC = "asc";
const TYPE_SORT_DESC = "desc";
const PARAMS_SORT = [
    { name: "Название ▲", pValue: "title-asc" },
    { name: "Название ▼", pValue: "title-desc" },
    { name: "Дата добавления ▲", pValue: "date-asc" },
    { name: "Дата добавления ▼", pValue: "date-desc" },
];
const PARAMS_VIEW = [
    { name: "10", pValue: 10 },
    { name: "20", pValue: 20 },
    { name: "50", pValue: 50 },
    { name: "Все", pValue: Infinity },
];

function TrackList({ isEdit, dataList, likeTrackList, modeview, pageView, idPlayTrack }) {
    const [sortBy, setSortBy] = useState(DATE_SORT);
    const [sortOrder, setSortOrder] = useState(TYPE_SORT_DESC);
    const [animatingTracks, setAnimatingTracks] = useState(new Set());

    const itemsPerPage = modeview === "all" ? Infinity : parseInt(modeview) || 20; // Количество элементов на странице
    const currentPage = pageView ? parseInt(pageView) : 1; // Номер текущей страницы

    const sortedTracks = useMemo(() => {
        if (!dataList.tracks) return [];

        const tracks = [...dataList.tracks];
        const compareFn = (a, b) => {
            const orderMultiplier = sortOrder === TYPE_SORT_ASC ? 1 : -1;
            if (sortBy === TITLE_SORT) {
                return orderMultiplier * a.title.localeCompare(b.title);
            }
            return orderMultiplier * (new Date(a.date) - new Date(b.date));
        };

        return tracks.sort(compareFn);
    }, [dataList.tracks, sortBy, sortOrder]);

    const paginatedTracks = useMemo(() => {
        if (itemsPerPage !== Infinity) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            return sortedTracks.slice(startIndex, startIndex + itemsPerPage);
        }
        return sortedTracks;
    }, [sortedTracks, currentPage, itemsPerPage]);

    const handleLikeToggle = (eo, elem) => {
        eo.stopPropagation();
        const isChecked = eo.target.checked;

        if (isChecked) {
            const newElem = { ...elem, idAlbum: dataList.idAlbum, titleAlbum: dataList.titleAlbum, date: Date.now() };
            eventFlow.emit("addTrack", newElem);
        } else {
            if (isEdit) {
                setAnimatingTracks((prev) => new Set(prev).add(elem.idTrack));
                setTimeout(() => {
                    eventFlow.emit("delTrack", elem.idTrack);
                    setAnimatingTracks((prev) => {
                        const updatedSet = new Set(prev);
                        updatedSet.delete(elem.idTrack);
                        return updatedSet;
                    });
                }, 700);
            } else {
                eventFlow.emit("delTrack", elem.idTrack);
            }
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            eventFlow.emit(
                "setNavigate",
                `${PAGE_HOME_ALBUM}/${dataList.idAlbum}/${itemsPerPage === Infinity ? "all" : itemsPerPage}/${currentPage - 1}`
            );
        }
    };
    const handleNextPage = () => {
        eventFlow.emit(
            "setNavigate",
            `${PAGE_HOME_ALBUM}/${dataList.idAlbum}/${itemsPerPage === Infinity ? "all" : itemsPerPage}/${currentPage + 1}`
        );
    };
    const setParamView = (newModeView) => {
        eventFlow.emit("setNavigate", `${PAGE_HOME_ALBUM}/${dataList.idAlbum}/${newModeView === Infinity ? "all" : newModeView}/1`);
    };
    const setParamSort = (value) => {
        const [newSortBy, newSortOrder] = value.split("-");
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
    };
    const setPlayTrack = (elem) => {
        eventFlow.emit("playTrack", elem);
    };

    const renderParamList = (arrElem) => {
        return arrElem.map((elem, i) => {
            return (
                <Select.Item key={`${elem.pValue}-${i}`} value={elem.pValue}>
                    {elem.name}
                </Select.Item>
            );
        });
    };
    const renderTrackRow = (elem, index) => (
        <Table.Row
            className={`track-list__table-row ${animatingTracks.has(elem.idTrack) && "delay-unm__type-4"}`}
            key={elem.idTrack}
            align="center"
            onClick={() => {
                setPlayTrack(elem);
            }}
        >
            <Table.Cell justify="center">{itemsPerPage !== Infinity ? (currentPage - 1) * itemsPerPage + index + 1 : index + 1}</Table.Cell>
            <Table.Cell justify="center">
                <div className="table-c2__box-photo">
                    {elem.photo ? (
                        <img src={elem.photo} alt="" title={`Обложка трека: ${elem.title}`} className="table-c2__photo" />
                    ) : (
                        skelet
                    )}
                </div>
            </Table.Cell>
            <Table.Cell justify="start" style={idPlayTrack === elem.idTrack && { color: "var(--accent-a11)" }}>
                <p className="table-c3__title cell_text-overflow">{elem.title}</p>
                <p className="table-c3__artist cell_text-overflow">{elem.artist}</p>
            </Table.Cell>
            <Table.Cell className="cell_text-album cell_text-overflow" justify="center">
                {elem.titleAlbum || dataList.titleAlbum}
            </Table.Cell>
            <Table.Cell className="cell_text-date" justify="center">
                {formattedDate(elem.date)}
            </Table.Cell>
            <Table.Cell justify="center">{elem.time}</Table.Cell>
            <Table.Cell justify="center">
                <label
                    className="table-c7__checkbox"
                    onClick={(eo) => {
                        eo.stopPropagation(); // Дополнительная защита от всплытия
                    }}
                >
                    <input
                        type="checkbox"
                        className="table-c7__input-cbox"
                        checked={likeTrackList.includes(elem.idTrack)}
                        onChange={(eo) => {
                            handleLikeToggle(eo, elem);
                        }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="table-c7__checkbox-img">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </label>
            </Table.Cell>
        </Table.Row>
    );

    return (
        <div className="track-list__box">
            <HeaderList
                photo={dataList.photoAlbum}
                dopText={
                    dataList.idAlbum && [`Номер альбома: ${dataList.idAlbum || "-"}`, `Количество треков: ${dataList.tracks?.length || 0}`]
                }
            >
                {dataList.titleAlbum}
            </HeaderList>

            <div className="track-list__params-box">
                <div className="params-box__num-view-box">
                    <Select.Root defaultValue={itemsPerPage} onValueChange={setParamView} disabled={!(paginatedTracks.length > 0)}>
                        <Select.Trigger className="num-view-box__list" variant="soft" />
                        <Select.Content>
                            <Select.Group>
                                <Select.Label>Показывать по:</Select.Label>
                                <Select.Separator />
                                {renderParamList(PARAMS_VIEW)}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </div>

                <Select.Root defaultValue={`${sortBy}-${sortOrder}`} onValueChange={setParamSort} disabled={!(paginatedTracks.length > 0)}>
                    <Select.Trigger className="params-box__list" variant="soft" />
                    <Select.Content>
                        <Select.Group>
                            <Select.Label>Сортировка по:</Select.Label>
                            <Select.Separator />
                            {renderParamList(PARAMS_SORT)}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </div>
            <div>
                <Separator size="4" />
                <Table.Root className="track-list__box-table">
                    <Table.Header>
                        <Table.Row className="track-list__table-row" align="center">
                            <Table.ColumnHeaderCell className="track-list__table-c1" justify="center">
                                #
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="track-list__table-c2"></Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="track-list__table-c3" justify="start">
                                Название
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="track-list__table-c4" justify="center">
                                Альбом
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="track-list__table-c5" justify="center">
                                Дата добавления
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="track-list__table-c6" justify="center">
                                {iconTime}
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="track-list__table-c7"></Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {paginatedTracks.length > 0 ? (
                            paginatedTracks.map(renderTrackRow)
                        ) : (
                            <Table.Row className="track-list__table-row">
                                <Table.Cell colSpan="7">{skelet}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Root>
            </div>

            {dataList.tracks?.length > itemsPerPage && (
                <div className="track-list__page-btn-box">
                    <div className="page-btn__box">
                        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                            {"<<"}
                        </Button>
                        <span className="page-btn__text">Страница: {currentPage}</span>
                        <Button onClick={handleNextPage} disabled={currentPage >= Math.ceil(dataList.tracks?.length / itemsPerPage)}>
                            {">>"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(TrackList);
