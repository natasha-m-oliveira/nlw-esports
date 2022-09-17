interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
  className?: string;
}

export function GameBanner({
  className,
  bannerUrl,
  adsCount,
  title,
}: GameBannerProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
  }
  return (
    <a
      href=""
      className={`relative rounded-lg overflow-hidden ${
        className ? className : ''
      }`}
      onClick={handleClick}
    >
      <img src={bannerUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
