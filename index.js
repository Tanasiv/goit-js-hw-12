import{a as M,S as v,i as n}from"./assets/vendor-BH0vf-C9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const S="55197171-7badb4f38387852aef8c7c06b",q=M.create({baseURL:"https://pixabay.com/api"});async function h(e,t){const a={key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};return(await q.get("/",{params:a})).data}const c={gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")},f=new v(".gallery a",{captionsData:"alt",captionDelay:250});function B(e){return e.map(t=>P(t)).join("")}function P(e){return`
    <li class="gallery__item">
    <a href="${e.largeImageURL}" class="photo-link">
      <div class="photo-card">
        <img
          class="photo-card__image"
          src="${e.webformatURL}"
          alt="${e.tags}"
        />

        <ul class="photo-card__stats">
          <li class="photo-card__item">
            <span class="photo-card__label">Likes</span>
            <span class="photo-card__value">${e.likes}</span>
          </li>
          <li class="photo-card__item">
            <span class="photo-card__label">Views</span>
            <span class="photo-card__value">${e.views}</span>
          </li>
          <li class="photo-card__item">
            <span class="photo-card__label">Comments</span>
            <span class="photo-card__value">${e.comments}</span>
          </li>
          <li class="photo-card__item">
            <span class="photo-card__label">Downloads</span>
            <span class="photo-card__value">${e.downloads}</span>
          </li>
        </ul>
      </div>
    </a>
    </li>
  `}function y(e){const t=B(e);c.gallery.insertAdjacentHTML("beforeend",t),f.refresh()}function R(){c.gallery.innerHTML="",f.refresh()}function m(){c.loader.classList.remove("hidden")}function g(){c.loader.classList.add("hidden")}function _(){c.loadMoreBtn.classList.remove("hidden")}function p(){c.loadMoreBtn.classList.add("hidden")}const H=15;let u="",i=1;const l={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")},$={message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"},x={message:"Please enter a search query.",position:"topRight"},L={message:"Sorry, something went wrong. Please try again later.",position:"topRight"},b={message:"We're sorry, but you've reached the end of search results.",position:"topRight"};l.form.addEventListener("submit",async e=>{e.preventDefault(),p();const t=new FormData(l.form),a=String(t.get("search-text")??"").trim();if(!a){n.warning(x);return}u=a,i=1,R(),m();try{const s=await h(u,i),o=s.hits;if(o.length===0){n.error($);return}y(o),w(s.totalHits,{hadHits:!0})}catch{n.error(L)}finally{g()}});l.loadMoreBtn.addEventListener("click",async()=>{const e=i+1;p(),m();try{const t=await h(u,e),a=t.hits;if(a.length===0){n.info(b);return}i=e,y(a),w(t.totalHits,{hadHits:!0}),E()}catch{n.error(L),_()}finally{g()}});function E(){const e=l.gallery.querySelector(".photo-link");if(!e)return;const t=e.getBoundingClientRect().height;window.scrollBy({top:2*t,left:0,behavior:"smooth"})}function w(e,{hadHits:t=!1}={}){i*H<e?_():(p(),t&&n.info(b))}
//# sourceMappingURL=index.js.map
