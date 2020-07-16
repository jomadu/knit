import { reverse } from "named-urls";
import { backend, addBackendURL } from "../../../common/urls";
import axios from "axios";

export const getFromReportDetail = (pk) => {
    return axios
        .get(addBackendURL(reverse(backend.api.reportDetail, { pk: pk })), {})
        .then((response) => response.data);
};
