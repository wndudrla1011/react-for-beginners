import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [budget, setBudget] = useState(0);
  const [selected, setSelected] = useState("");
  const onChange = (event) => setBudget(event.target.value);
  const handleSelect = (event) => setSelected(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json); //coins -> json
        setLoading(false); //Loading 문구 제거
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <h1>{budget < 0 ? <strong>Invalid number!</strong> : null}</h1>
          <h1>
            {selected !== "" && budget > 0
              ? `You can buy ${Math.floor(
                  parseInt(budget) / Math.ceil(parseFloat(selected))
                )} EA`
              : null}
          </h1>
          <div>
            <select onChange={handleSelect} value={selected}>
              {coins.map((coin, index) => (
                <option value={coin.quotes.USD.price} key={index}>
                  {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              onChange={onChange}
              value={budget}
              type="number"
              placeholder="Enter your budget"
            />
            $
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
