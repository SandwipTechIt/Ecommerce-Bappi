import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import MessageTable from '../../components/message/messageTable';
import { getApi, deleteApi } from '../../api';
import { useQuery } from '@tanstack/react-query';


export default () => {
    const {data, isLoading, isError, error,refetch} = useQuery({
        queryKey: ["getAllMessages"],
        queryFn: () => getApi("getAllMessages"),
        keepPreviousData: true,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });

    const handleDeleteMessage  = async (id) => {
        try {
            await deleteApi(`deleteMessage/${id}`);
            refetch();
        } catch (error) {
            alert("Failed to delete message");
        }
    };
    return (
        <div>
            <MessageTable messages={data?.data} onDeleteMessage={handleDeleteMessage} />
        </div>
    )
}

