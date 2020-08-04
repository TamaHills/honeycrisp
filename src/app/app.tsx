import { h, FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { ProtectedRouter } from './components';

interface Props {
    musickit: MusicKit.MusicKitInstance;
}

export const App: FunctionComponent<Props> = ({ musickit }: Props) => {
    return (
        <div id="root-container">
            <ProtectedRouter musickit={musickit}>
                <Library musickit={musickit} />
            </ProtectedRouter>
        </div>
    );
};

export const Library: FunctionComponent<Props> = ({ musickit }: Props) => {
    let [albums, setAlbums] = useState<MusicKit.Resource[]>([]);

    useEffect(() => {
        musickit.api.library.albums([]).then((res) => setAlbums(res));
    }, []);

    const playAlbum = (id: string) => {
        // @ts-ignore
        musickit.setQueue({ album: id }).then(() => {
            musickit.player.play().catch(e=>console.dir(e))
        })
    };

    console.log(albums);

    return (
        <div id="library-container">
            <div className="library-grid-view">
                {albums.map(({ id, attributes }) => {
                    const { artwork, name, artistName } = attributes as {
                        artwork: MusicKit.Artwork;
                        name: string;
                        artistName: string;
                    };

                    return (
                        <AlbumCard
                            key={id}
                            id={id}
                            albumArtUrl={MusicKit.formatArtworkURL(
                                artwork,
                                150,
                                150,
                            )}
                            onClick={playAlbum}
                            name={name}
                            artist={artistName}
                        />
                    );
                })}
            </div>
        </div>
    );
};

interface AlbumCardProps {
    id: string;
    name: string;
    artist: string;
    albumArtUrl: string;
    onClick: (id: string) => void;
}

export const AlbumCard: FunctionComponent<AlbumCardProps> = ({
    id,
    name,
    albumArtUrl,
    artist,
    onClick,
}) => {
    return (
        <div onClick={() => onClick(id)} class="album-card">
            <div class="album-card-artwork">
                <img src={albumArtUrl} alt={name} />
            </div>
            <div class="album-card-name">{name}</div>
            <div class="album-card-artist">{artist}</div>
        </div>
    );
};
