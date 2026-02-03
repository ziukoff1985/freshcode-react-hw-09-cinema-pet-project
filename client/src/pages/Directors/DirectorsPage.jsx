import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import DirectorsList from '../../components/Lists/DirectorsList';

function DirectorsPage() {
    return (
        <>
            <Stack>
                <Link to='/directors/new'>
                    <Button>Add director</Button>
                </Link>
            </Stack>
            <div>DirectorsPage</div>
            <DirectorsList />
        </>
    );
}

export default DirectorsPage;
