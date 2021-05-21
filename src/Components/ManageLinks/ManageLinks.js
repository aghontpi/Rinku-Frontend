import React, { useEffect, useState } from "react";
import { managelinks } from "./../../Api/ManageLinks"
import { SnackBar } from "../SnackBar/Snackbar";
import { usePrevious } from "../Utils";
import { Loading } from "../Loading/Loading";
import FadeIn from "react-fade-in";
import Switch from "react-switch";
function ManageLinks(props) {
    const [contents, setContents] = useState({ items: 10, content: null })
    const [loading, setLoading] = useState(true);
    const [snack, setSnack] = useState(false);
    const [snackProp, setSnackProp] = useState({
        msg: "",
        type: "success"
    });
    const prevcontent = usePrevious(contents);
    const apiCall = () => {
        setLoading(true);
        managelinks({ limit: contents.items })
            .then((response) => (response.status === 200) ? response.json() : {})
            .then((json) => {
                setLoading(false);
                if (json.response === "success") {
                    const list = JSON.parse(json.content.list)
                    const err = () => {
                        setSnackProp({
                            msg: 'error fetching list from server',
                            type: 'success'
                        });
                        setSnack(true)
                    }
                    list ? setContents((prevstate) => {
                        return { items: prevstate.items, content: list }
                    })
                        : err();
                } else {
                    const err = json.response
                        ? json.errors.errMsg && json.errors.errMsg
                        : "can not fetch list from server"
                    setSnackProp({
                        msg: err,
                        type: "error"
                    });
                    setSnack(true);
                }
            })
    }


    useEffect(() => {
        apiCall();
        // window.$('table').transition('fade up');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        prevcontent && (contents.items !== prevcontent.items) && apiCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contents])

    return (
        <React.Fragment>
            { Loading(props = { show: loading })}
            { contents.content !== null && list(contents, setContents, { setSnack, setSnackProp })}
            {snack && <SnackBar params={
                {
                    show: true,
                    key: 1,
                    msg: snackProp.msg,
                    type: snackProp.type,
                    cb: setSnack
                }
            } />}
        </React.Fragment>
    );
}

function list({ items, content }, setContents, { setSnack, setSnackProp }) {

    const modifyItems = (value) => {
        value && setContents((prevstate) => {
            const itemsChange = (+prevstate.items) + (+value)
            return {
                content: null,
                items: itemsChange,
            }
        });
    }

    const nextBtnClick = () => {
        modifyItems(+10)
    };
    const prevBtnClick = () => {
        modifyItems(-10)
    }
    return (
        <FadeIn>
            <table className="ui stripped table">
                {
                    tableHeader()
                }
                {
                    content.map((content, key) => {
                        const downloadName = content.download_name;
                        return (
                            <tr key={key}>
                                <td>{itemSpan(link(downloadName))}</td>
                                <td>{itemSpan(content.path_of_file)}</td>
                                <td
                                    onClick={
                                        () => enableDisable(
                                            (downloadName),
                                            content.status,
                                            key,
                                            { setSnack, setSnackProp, setContents }
                                        )
                                    }
                                    style={
                                        { cursor: "pointer", paddingRight: "24px" }
                                    }
                                    className="right aligned"
                                >
                                    {itemStatus(content.status, key + "icon")}</td>
                            </tr>
                        );
                    })
                }
                {
                    tableFooter({ items: items, count: content.length }, { prev: prevBtnClick, next: nextBtnClick })
                }
            </table>
        </FadeIn>
    );
}

function tableHeader() {
    return (
        <thead>
            <tr>
                <th>downloadId</th>
                <th >Path</th>
                <th style={{ paddingRight: "40px" }}
                    className="right aligned">Status</th>
            </tr>
        </thead>
    );
}

export function tableFooter({ items, count }, { prev, next }, colCount = 4) {
    const prevBtnCls = "ui small button " + (items === 10 ? " disabled " : "");
    const nextBtncls = "ui small right floated button" + (count < 10 ? " disabled " : "");
    return (
        <tfoot className="full-width">
            <tr>
                <th colSpan={colCount}>
                    <div className={prevBtnCls} onClick={prev} >
                        prev
                    </div>
                    <div className={nextBtncls} onClick={next}>
                        next
                    </div>
                </th>
            </tr>
        </tfoot>
    )
}

export function link(id, name = null) {
    return (
        <FadeIn><a target="blank" href={"../download/" + id}> {name ? name : id}</a></FadeIn>
    );
}

export function itemSpan(content) {
    return (
        <FadeIn><span>{content}</span></FadeIn>
    );
}



function itemStatus(content, key) {
    return (
        <FadeIn><span key={key}>{<
            Switch id={key}
            onChange={() => { }}
            checked={content === "Y"}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#000"
        />

        }</span></FadeIn>
    );
}

const enableDisable = (id, action, key, { setSnack, setSnackProp, setContents }) => {
    action = action === "Y" ? "N" : "Y";
    managelinks({ update: action, id: id })
        .then((response) => (response.status === 200) ? response.json() : {})
        .then((json) => {
            const err = (type = "error", msg = 'error contacting server') => {
                setSnackProp({
                    msg: msg,
                    type: type
                });
                return setSnack(true) || true;
            }
            const success = (msg) => {
                err("success", msg);
            }
            if (!json && err()) { return }
            if (json.response === "success") {
                setContents((prevState) => {
                    let copy = prevState;
                    copy.content.forEach(element => {
                        if (element.download_name === id) {
                            element.status = action;
                        }
                    });
                    return ({
                        ...prevState,
                        content: copy.content
                    });
                })
                success(json.content.status);
            } else {
                const err = json.response
                    ? json.errors.errMsg && json.errors.errMsg
                    : "can not fetch list from server"
                setSnackProp({
                    msg: err,
                    type: "error"
                });
                setSnack(true);
            }
        })
}

export default ManageLinks;