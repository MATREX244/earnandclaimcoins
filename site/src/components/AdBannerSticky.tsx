export default function AdBannerSticky() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<!-- BEGIN AADS AD UNIT 2440274 -->
<div style="position: absolute; z-index: 99999">
  <input autocomplete="off" type="checkbox" id="aadsstickympw13t1r" hidden />
  <div style="padding-top: auto; padding-bottom: 0;">
    <div style="position:fixed;top:50%;right:10px;transform:translateY(-50%);z-index:99998;display:flex;flex-direction:column;align-items:center;gap:6px;background:rgba(255,255,255,0.1);backdrop-filter:blur(4px);padding:8px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 8px 32px rgba(0,0,0,0.15);">
      <label for="aadsstickympw13t1r" style="align-self:flex-end;border-radius:4px;background:rgba(248,248,249,0.85);padding:4px;z-index:99999;cursor:pointer;display:flex;align-items:center;justify-content:center;width:22px;height:22px;">
        <svg fill="#000000" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490">
          <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337"/>
        </svg>
      </label>
      <iframe data-aa="2440274" src="//acceptable.a-ads.com/2440274/?size=160x600" style="border:0;padding:0;width:112px;height:400px;overflow:hidden;display:block;"></iframe>
    </div>
    <style>
      #aadsstickympw13t1r:checked + div { display: none; }
    </style>
  </div>
</div>
<!-- END AADS AD UNIT 2440274 -->
        `
      }}
    />
  );
}
