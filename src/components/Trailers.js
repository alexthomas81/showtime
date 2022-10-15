import '../styles/Trailers.css';
import CloseIcon from '@material-ui/icons/Close';

function Trailers({ videos, width, setTrailerData }) {

    const handleClose = e => {
        e.stopPropagation();
        setTrailerData(null);
    }

    return (
        <div className="trailer-container">
            <div className="trailer-popup">
                <CloseIcon style={{ color: "blue", cursor: "pointer" }} onClick={handleClose} />
                <div className="trailer-detail">
                    {videos.length > 0 && videos.map((list, index) =>
                        <div className="trailer-item" key={index}>
                            <iframe
                                type="text/html"
                                title={list.id}
                                width={width > 1024 ? 300 : 190}
                                height={width > 1024 ? 300 : 190}
                                src={`http://www.youtube.com/embed/${list.key}`}
                                frameBorder="0">
                            </iframe>
                        </div>
                    )}
                </div>
                {videos.length === 0 ? 'No trailers found.' : ''}
            </div>
        </div>
    );
}

export default Trailers;
