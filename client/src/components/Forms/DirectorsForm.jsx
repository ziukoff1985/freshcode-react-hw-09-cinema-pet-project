import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById } from '../../store/thunks/moviesThunks';
import { useDispatch, useSelector } from 'react-redux';

function DirectorsForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentMovie, isPending } = useSelector(
        (state) => state.moviesList,
    );

    useEffect(() => {
        dispatch(getMovieById(id));
    }, [dispatch, id]);
    return <div>DirectorsForm</div>;
}

export default DirectorsForm;
