<script lang="ts">
  import { onMount } from "svelte";
  import type { Zone } from "../consts/seat-schema";
  import { currentSeat } from "../stores/reserve";

  export let zone: Zone;
  export let onclick;
  export let reserved: { zone: String; seat: string }[];
  const { id, name, columns, rows, seats, floor, invert, hiddenCells } = zone;
  let _seats = [];
  const totalCells = columns * rows;

  function isReserved(seatId: string) {
    return reserved.some((r) => r.seat === seatId && r.zone === name);
  }

  let seatNumber = 1;
  for (let index = 0; index < totalCells; index++) {
    const hidden = hiddenCells.some((hc) => hc === index + 1);
    if (hidden) {
      _seats.push({ hidden });
    } else {
      const seatId = `Z${name}-${seatNumber}`;
      _seats.push({
        seatNumber,
        seatId,
        reserved: isReserved(seatNumber.toString()),
      });
      seatNumber++;
    }
  }

  onMount(() => {
    if (invert) {
      _seats = _seats.reverse();
    }
  });
</script>

<div
  {id}
  data-zonename={`Zona ${name}`}
  class={[
    "zone",
    `columns-${columns}`,
    `rows-${rows}`,
    `f-${floor}`,
    `${$currentSeat.seatZone === name && "selected"}`,
  ].join(" ")}
>
  {#each _seats as { seatId, seatNumber, hidden, reserved }}
    {#if hidden}
      <div></div>
    {:else}
      <button
        id={seatId}
        disabled={reserved}
        class={[
          "seat",
          `${$currentSeat.seatNumber === seatNumber.toString() && $currentSeat.seatZone === name && "selected"}`,
        ].join(" ")}
        on:click={() => onclick(name, seatNumber)}
      >
        {seatNumber}
      </button>
    {/if}
  {/each}
</div>

<style lang="scss">
  .zone {
    background-color: #e7e7e7;
    color: white;
    display: grid;
    flex-wrap: wrap;
    gap: 3px;
    padding: 5px;
    position: relative;

    &.selected {
      background-color: var(--bulma-warning-50);
    }

    &::before {
      content: attr(data-zonename);
      position: absolute;
      top: -25px;
      left: 0;
      right: 0;
      height: 25px;
      background-color: var(--bulma-primary-15);
      padding: 0 10px;
      font-weight: bold;
    }
  }

  .seat {
    background-color: #ffe5d9;
    border: 1px solid #9d8189;
    display: grid;
    place-content: center;
    text-align: center;
    border-radius: 6px;
    color: #644e54;
    font-size: 70%;

    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
      &:hover {
        scale: 0;
      }
    }

    &.selected {
      background-color: var(--bulma-primary-30);
      color: var(--bulma-primary-invert-30);
    }

    &:hover {
      background-color: #3fa9f5;
      border-color: #2b79b1;
      color: white;
      cursor: pointer;
      scale: 1.8;
    }
  }

  .columns {
    @for $i from 1 through 20 {
      &-#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }
  }

  .rows {
    @for $i from 1 through 20 {
      &-#{$i} {
        grid-template-rows: repeat($i, 1fr);
      }
    }
  }

  #Z-1 {
    grid-column: 25/30;
    grid-row: 2/6;
    grid-auto-flow: column;
  }

  #Z-2 {
    grid-column: 25/30;
    grid-row: 6/13;
    grid-auto-flow: column;
  }

  #Z-3 {
    grid-column: 20/25;
    grid-row: 7/13;
    direction: rtl;

    button:nth-of-child(2) {
      order: 5;
      background-color: blue !important;
    }
    // rotate: -8deg;
  }

  #Z-4 {
    grid-column: 15/20;
    grid-row: 7/13;
    direction: rtl;
  }

  #Z-5 {
    grid-column: 10/15;
    grid-row: 7/13;
    direction: rtl;
  }

  #Z-6 {
    grid-column: 5/10;
    grid-row: 7/13;
    grid-auto-flow: column;
  }

  #Z-7 {
    grid-column: 5/10;
    grid-row: 2/7;
    grid-auto-flow: column;
  }

  #Z-8 {
    grid-column: 1/5;
    grid-row: 1/11;
    grid-auto-flow: column;
  }

  #Z-9 {
    grid-column: 1/5;
    grid-row: 11/18;
    grid-auto-flow: column;
  }

  #Z-10 {
    grid-column: 5/10;
    grid-row: 13/18;
    direction: rtl;
  }

  #Z-11 {
    grid-column: 10/17;
    grid-row: 14/18;
    direction: rtl;
  }

  #Z-12 {
    grid-column: 18/25;
    grid-row: 14/18;
    direction: rtl;
  }

  #Z-13 {
    grid-column: 25/30;
    grid-row: 15/18;
    direction: rtl;
  }

  #Z-14 {
    grid-column: 4/10;
    grid-row: 18/22;
    direction: rtl;
  }

  #Z-15 {
    grid-column: 12/17;
    grid-row: 18/22;
    direction: rtl;
  }

  #Z-16 {
    grid-column: 25/30;
    grid-row: 16/22;
    direction: rtl;
  }

  #Z-17 {
    grid-column: 20/25;
    grid-row: 16/22;
    direction: rtl;
  }

  #Z-18 {
    grid-column: 14/20;
    grid-row: 16/22;
    direction: rtl;
  }

  #Z-19 {
    grid-column: 7/14;
    grid-row: 16/22;
    direction: rtl;
  }

  #Z-20 {
    grid-column: 1/7;
    grid-row: 19/23;
    // rotate: 45deg;
    // translate: 60px -60px;
    direction: rtl;
  }

  #Z-21 {
    grid-column: 1/7;
    grid-row: 9/19;
    grid-auto-flow: column;
    // direction: rtl;
  }

  #Z-22 {
    grid-column: 1/7;
    grid-row: 1/9;
    grid-auto-flow: column;
  }
</style>
