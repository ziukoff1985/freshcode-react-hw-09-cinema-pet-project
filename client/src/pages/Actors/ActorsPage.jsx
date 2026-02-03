import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import ActorsList from '../../components/Lists/ActorsList';

function ActorsPage() {
    return (
        <>
            <Stack>
                <Link to='/actors/new'>
                    <Button>Add actor</Button>
                </Link>
            </Stack>
            <div>ActorsPage</div>
            <ActorsList />
        </>
    );
}

export default ActorsPage;
