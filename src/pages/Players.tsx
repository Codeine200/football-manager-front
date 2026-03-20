import { useState } from "react";

type Player = {
    id: number;
    name: string;
    team?: string;
    image: string;
};

const playersData: Player[] = [
    {
        id: 1,
        name: "Álvaro Cortés Moyano",
        team: "Barcelona",
        image: "/images/players/alvaro_cortes_moyano.webp",
    },
    {
        id: 2,
        name: "Andreas Christensen",
        team: "Barcelona",
        image: "/images/players/andreas_christensen.webp",
    },
    {
        id: 3,
        name: "Diego Kochen",
        image: "/images/players/diego_kochen.webp",
    },
    {
        id: 4,
        name: "Eric García",
        image: "/images/players/eric_garcia.webp",
    },
];

const Players = () => {
    const [search, setSearch] = useState("");

    const filteredPlayers = playersData.filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="search">
  x
            </div>

            <div className="players">
                {filteredPlayers.map((player) => (
                    <div className="players__item" key={player.id}>
                        <div className="players__logo">
                            <img
                                src={player.image}
                                alt={player.name}
                                className="players__image"
                            />
                        </div>

                        <div className="players__title">
                            <div className="players__name">{player.name}</div>

                            {player.team && (
                                <div>
                                    <a href="#" className="players__date">
                                        {player.team}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button className="pagination__prev">Prev</button>
                <button className="pagination__page">1</button>
                <button className="pagination__current">2</button>
                <button className="pagination__page">3</button>
                <button className="pagination__next">Next</button>
            </div>
        </>
    );
};

export default Players;