<script>
  import { SeatsZonesFloor_1, SeatsZonesFloor_2 } from "../consts/seat-schema";
  import ZoneGrid from "./ZoneGrid.svelte";
  import { enableSeats, currentReserve } from "../stores/reserve";

  let visibleFloor = "1";

  function handleFloorSelect(evt) {
    const floor = evt.currentTarget.value;
    visibleFloor = floor;
  }

  function handleSeatClick(zone, seat) {
    currentReserve.set({
      ...$currentReserve,
      seatNumber: seat.toString(),
      seatZone: zone.toString(),
    });
  }
</script>

<div class="container">
  <div id="floor-selector-container" class="columns">
    <div class="column">
      <div class="field">
        <label>Seleccione el piso</label>
        <div class="control">
          <div class="select">
            <select on:change={handleFloorSelect}>
              <option value="1">1er Piso</option>
              <option value="2">2do Piso</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="columns">
  <div class="column">
    <div id="seats-grid" class={[`${!enableSeats && "disabled"}`]}>
      <div id="altar">
        <p>Altar</p>
      </div>

      <div id="entrada-metro">
        <p>Entrada metro</p>
      </div>

      <div id="entrada-principal">
        <p>Entrada principal</p>
      </div>

      {#if visibleFloor === "1"}
        {#each SeatsZonesFloor_1 as zone}
          <ZoneGrid
            {zone}
            selected={$currentReserve}
            onclick={handleSeatClick}
          />
        {/each}
      {/if}

      {#if visibleFloor === "2"}
        {#each SeatsZonesFloor_2 as zone}
          <ZoneGrid
            {zone}
            selected={$currentReserve}
            onclick={handleSeatClick}
          />
        {/each}
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  #seats-grid {
    display: grid;
    grid-template-columns: repeat(29, 1fr);
    grid-template-rows: repeat(21, 1fr);
    width: 100%;
    height: 100vh;
    padding: 10px;
    column-gap: 10px;
    row-gap: 30px;
    position: relative;

    &.disabled::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #f2f2f2b3;
      z-index: 99;
    }
  }

  #altar {
    grid-column: 10/25;
    grid-row: 1/5;
    background-color: #9d8189;
    display: grid;
    place-content: center;
  }

  #entrada-metro {
    grid-column: 1/4;
    grid-row: 14/18;
    background-color: cadetblue;
    display: grid;
    place-items: center;
    text-align: center;
    color: white;
  }

  #entrada-principal {
    grid-column: 28/30;
    grid-row: 12/15;
    background-color: cadetblue;
    display: grid;
    place-items: center;
    text-align: center;
    color: white;
  }
</style>
