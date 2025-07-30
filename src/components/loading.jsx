import '../css/loadingModal.css';

const loadingModal = () =>{
    console.log('LoadingModal component rendered');
    return (
        <div className="spinner-container">
            <div className="loading-spinner" />
        </div>
    );
}

export default loadingModal;