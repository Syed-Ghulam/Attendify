
import { apiFetch } from "../config/api";

export const apiService = {

    // Users
    createUser: async (payload) => {

        const response = await apiFetch(
            "/users",
            {
            method: "POST",
            body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

    return data;
    },

    getUsers : async () =>{
        const response = await apiFetch("/users");

        if(!response.ok)
            throw new Error ("Failed to fetch users");

        return response.json();
    },

    getUserById: async (userId) => {

        const response = await apiFetch(
            `/users/${userId}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return response.json();
    },

    updateUser: async (userId, payload) => {

        const response = await apiFetch(
            `/users/${userId}`,
            {
            method: "PUT",
            body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
            data.message || "Failed to update user"
            );
        }

        return data;
    },

    updateUserStatus: async (userId, payload) => {

        const response = await apiFetch(
            `/users/${userId}/status`,
            {
                method: "PATCH",
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to update user status"
            );
        }

        return data;
    },

    deleteUser : async(userId) => {

        const response = await apiFetch(`/users/${userId}`,
              {
                method: "DELETE" 
              }
            );
        
            if (!response.ok) {
              throw new Error("Failed");
            }

            return true;
    },


    //Groups

    createGroup: async (payload) => {

    const response = await apiFetch(
        "/groups",
        {
        method: "POST",
        body: JSON.stringify(payload)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message || "Failed to create group"
        );
    }

    return data;
    },
    getGroups: async () => {
 
    const response = await apiFetch("/groups");

    if (!response.ok) {
        throw new Error("Failed to fetch groups");
    }

    return response.json();
    },

    getGroupById: async (groupId) => {

        const response = await apiFetch(
            `/groups/${groupId}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch group");
        }

        return response.json();
    },

    updateGroup: async (
    groupId,
    payload
    ) => {

    const response = await apiFetch(
        `/groups/${groupId}`,
        {
        method: "PUT",
        body: JSON.stringify(payload)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message || "Failed to update group"
        );
    }

    return data;
    },

    updateGroupStatus: async (groupId, payload) => {

        const response = await apiFetch(
            `/groups/${groupId}/status`,
            {
                method: "PATCH",
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update group status");
        }

        return data;
    },

    
    deleteGroup: async (groupId) => {

    const response = await apiFetch(
        `/groups/${groupId}`,
        {
        method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete group");
    }

    return true;
    },

    // WorkStation

    createWorkStation: async (
            payload
            ) => {

            const response =
                await apiFetch(
                "/workstation",
                {
                    method: "POST",
                    body: JSON.stringify(
                    payload
                    )
                }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                data.message ||
                "Failed to create workstation"
                );
            }

            return data;
    },

    getWorkStations: async () => {

    const response = await apiFetch(
        "/workstation"
    );

    if (!response.ok) {
        throw new Error(
        "Failed to fetch workstations"
        );
    }

    return response.json();
    },

    getWorkStationById: async (id) => {

        const response = await apiFetch(
            `/workstation/${id}`
        );

        if (!response.ok) {
            throw new Error(
            "Failed to fetch workstation"
            );
        }

        return response.json();
    },

    updateWorkStation: async (
    workStationId,
    payload
    ) => {

    const response = await apiFetch(
        `/workstation/${workStationId}`,
        {
        method: "PUT",
        body: JSON.stringify(payload)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message ||
        "Failed to update workstation"
        );
    }

    return data;
    },

    updateWorkStationStatus: async (id, payload) => {

        const response = await apiFetch(
            `/workstation/${id}/status`,
            {
                method: "PATCH",
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    },

    deleteWorkStation: async (
    workStationId
    ) => {

    const response = await apiFetch(
        `/workstation/${workStationId}`,
        {
        method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(
        "Failed to delete workstation"
        );
    }

    return true;
    },

    //Line

    createLine: async (payload) => {

    const response = await apiFetch(
        "/line",
        {
            method: "POST",
            body: JSON.stringify(payload)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create line"
        );
    }

    return data;
    },

        getLines: async () => {

                const response = await apiFetch("/line");

                if (!response.ok) {
                    throw new Error("Failed to fetch lines");
                }

                return response.json();
                },

                getLineById: async (id) => {

            const response = await apiFetch(
                `/line/${id}`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch line"
                );
            }

            return response.json();
        },

        updateLine: async (lineId, payload) => {

        const response = await apiFetch(
            `/line/${lineId}`,
            {
            method: "PUT",
            body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
            data.message || "Failed to update line"
            );
        }

        return data;
        },

        updateLineStatus: async (lineId, payload) => {

            const response = await apiFetch(
                `/line/${lineId}/status`,
                {
                    method: "PATCH",
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update line status"
                );
            }

            return data;
        },

        deleteLine: async (lineId) => {

        const response = await apiFetch(
            `/line/${lineId}`,
            {
            method: "DELETE",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete line");
        }

        return true;
        },

        //Facility

        createFacility: async (payload) => {

            const response = await apiFetch(
                "/facility",
                {
                    method: "POST",
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to create facility"
                );
            }

            return data;
        },

        getFacilities: async () => {

            const response = await apiFetch(
                "/facility"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch facilities"
                );
            }

            return response.json();
        },

        getFacilityById: async (id) => {

            const response = await apiFetch(
                `/facility/${id}`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch facility"
                );
            }

            return response.json();
        },

        updateFacility: async (id, payload) => {

            const response = await apiFetch(
                `/facility/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update facility"
                );
            }

            return data;
        },

        updateFacilityStatus: async (facilityId, payload) => {

            const response = await apiFetch(
                `/facility/${facilityId}/status`,
                {
                    method: "PATCH",
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update facility status"
                );
            }

            return data;
        },

        deleteFacility: async (id) => {

            const response = await apiFetch(
                `/facility/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to delete facility"
                );
            }

            return true;
        },

};