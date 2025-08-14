export default ({ msg, retry }) => (
    <div className="text-center py-10">
      <p className="text-red-600 mb-3">{msg || 'Something went wrong'}</p>
      {retry && (
        <button onClick={retry} className="text-blue-600 underline">
          Try again
        </button>
      )}
    </div>
  );