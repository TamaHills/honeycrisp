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

    console.log(albums);

    return (
        <div id="library-container">
            <div className="library-grid-view">
                {albums.map(({ attributes }) => {
                    const { artwork, name, artistName } = attributes as {
                        artwork: MusicKit.Artwork;
                        name: string;
                        artistName: string;
                    };

                    return (
                        <AlbumCard
                            albumArtUrl={MusicKit.formatArtworkURL(
                                artwork,
                                150,
                                150,
                            )}
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
    name: string;
    artist: string;
    albumArtUrl: string;
}

export const AlbumCard: FunctionComponent<AlbumCardProps> = ({
    name,
    albumArtUrl,
    artist,
}) => {
    return (
        <div class="album-card">
            <div class="album-card-artwok">
                <img src={albumArtUrl} alt={name} />
            </div>
            <div class="album-card-name">{name}</div>
            <div class="album-card-artist">{artist}</div>
        </div>
    );
};
