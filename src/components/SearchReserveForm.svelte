<script lang="ts">
  import { DateTime } from "luxon";
  let citizenId = "";
  let reserve;
  let payments = [];
  async function searchReservation() {
    try {
      const result = await fetch(`/api/reserve/${citizenId}`);
      const data = await result.json();
      reserve = data.reserve;
      payments = data.payments;
    } catch (error) {
      alert("Reverva no encontrada");
    }
  }
</script>

<div class="columns">
  <div class="column">
    <div class="field">
      <div class="control">
        <label>Introduzca la cedula</label>
        <input
          id="citizen-id"
          class="input"
          type="text"
          bind:value={citizenId}
        />
      </div>
    </div>
    <div class="field">
      <button on:click={searchReservation} class="button is-primary">
        Buscar reserva
      </button>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <div class="card-header">
        <h4 class="title card-header-title">Reserva</h4>
      </div>
      <div class="card-content">
        {#if reserve}
          <table class="table is-fullwidth">
            <tbody>
              <tr>
                <th>Nombre y Apellido</th>
                <td>{reserve?.fullName}</td>
              </tr>
              <tr>
                <th>Cedula</th>
                <td>{reserve?.citizenId}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{reserve?.email}</td>
              </tr>
              <tr>
                <th>Celular</th>
                <td>{reserve?.cellphone}</td>
              </tr>
              <tr>
                <th>Talla camiseta</th>
                <td>{reserve?.tshirtSize}</td>
              </tr>
              <tr>
                <th>Asiento seleccionado</th>
                <td>
                  Zone: {reserve?.seatZone} Asiento: {reserve?.seatNumber}
                </td>
              </tr>
              <tr>
                <th>Reservado el</th>
                <td>
                  {DateTime.fromISO(reserve?.reservedAt).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </td>
              </tr>
              <tr>
                <th>Pagos</th>
                <td>
                  <div class="content">
                    <ul>
                      {#each payments as { paidAt, paymentType, paymentMethod }}
                        <li>
                          {DateTime.fromISO(paidAt).toLocaleString(
                            DateTime.DATE_MED
                          )}
                          {paidAt}
                          <br />
                          {paymentType}
                          <br />
                          {paymentMethod}
                        </li>
                      {/each}
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        {/if}
      </div>
      <div class="card-footer">
        <div class="card-footer-item">
          {#if !payments?.some((p) => p.paymentType === "total-payment" || p.paymentType === "final-payment")}
            <button id="set-last-payment" class="button is-primary">
              Abonar Ultimo Pago
            </button>
          {:else}
            Pagado ✅
          {/if}
        </div>
        <div class="card-footer-item">
          {#if reserve?.redeemed}
            Kit entregado ✅
          {:else}
            <button
              id="set-redeeme-kit"
              class="button is-primary"
              disabled={!payments?.some(
                (p) =>
                  p.paymentType === "total-payment" ||
                  p.paymentType === "final-payment"
              )}
            >
              Entregar Kit
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
