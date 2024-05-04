<script lang="ts">
  import ZoneGrid from "./ZoneGrid.svelte";
  import { SeatsZonesFloor_1, SeatsZonesFloor_2 } from "../consts/seat-schema";
  import { currentSeat } from "../stores/reserve";

  export let reserved: { zone: String; seat: string }[] = [];

  let visibleFloor = "1";

  function handleFloorSelect(evt) {
    const floor = evt.currentTarget.value;
    visibleFloor = floor;
  }

  function handleSeatClick(zone, seat) {
    currentSeat.set({
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
    <div id="seats-grid">
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
          <ZoneGrid {zone} {reserved} onclick={handleSeatClick} />
        {/each}
      {/if}

      {#if visibleFloor === "2"}
        {#each SeatsZonesFloor_2 as zone}
          <ZoneGrid {zone} {reserved} onclick={handleSeatClick} />
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
    height: 90vh;
    padding: 10px;
    column-gap: 10px;
    row-gap: 30px;
    position: relative;
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
    grid-row: 17/20;
    background-color: cadetblue;
    display: grid;
    place-items: center;
    text-align: center;
    color: white;
  }

  #entrada-principal {
    grid-column: 27/30;
    grid-row: 12/15;
    background-color: cadetblue;
    display: grid;
    place-items: center;
    text-align: center;
    color: white;
  }

  #floor-selector-container {
    margin-bottom: 2rem;
  }
</style>
