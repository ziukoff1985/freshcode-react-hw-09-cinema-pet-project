import { useState, useCallback } from 'react';

function useConfirm() {
    const [open, setOpen] = useState(false);
    const [payload, setPayload] = useState(null);

    const openConfirm = useCallback((data) => {
        setOpen(true);
        setPayload(data);
    }, []);

    const closeConfirm = useCallback(() => {
        setOpen(false);
        setPayload(null);
    }, []);

    return {
        open,
        payload,
        openConfirm,
        closeConfirm,
    };
}

export default useConfirm;
