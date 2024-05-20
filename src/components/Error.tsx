import './Error.scss'
function Error({error}: {error: string}) {

  return (
    <>
    <div className="error-container">
        <h3 className='error-message'>
            Error: {error}
        </h3>
    </div>
    </>
  );
}

export default Error;
