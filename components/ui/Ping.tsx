const Ping = () => {
  return (
    <>
    <div className="relative">
        <div className="absolute -left-4 top-1">
            <span className="flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-enerBorn opacity-75"></span>
                <span className="relative inline-flex size-3 h-full w-full rounded-full bg-enerBorn"></span>
            </span>
        </div>
    </div>
    </>
  )
}

export default Ping