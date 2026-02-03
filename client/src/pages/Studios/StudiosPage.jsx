import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

import StudiosList from '../../components/Lists/StudiosList';

function StudiosPage() {
    return (
        <>
            <Stack>
                <Link to='/studios/new'>
                    <Button>Add studio</Button>
                </Link>
            </Stack>
            <div>StudiosPage</div>
            <StudiosList />
        </>
    );
}

export default StudiosPage;
