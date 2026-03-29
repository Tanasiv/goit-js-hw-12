import{a as d,S as p,i}from"./assets/vendor-BH0vf-C9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const f="55197171-7badb4f38387852aef8c7c06b",h=d.create({baseURL:"https://pixabay.com/api"});function m(e){return h.get("/",{params:{key:f,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data)}const l={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")};let a=null;function y(){a||(a=new p(".gallery a",{captionsData:"alt",captionDelay:250})),a.refresh()}function g(e){l.gallery.innerHTML=_(e),y()}function _(e){return e.map(r=>L(r)).join("")}function L(e){return`
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
  `}function b(){l.gallery.innerHTML="",a&&a.refresh()}function q(){l.loader.classList.remove("hidden")}function v(){l.loader.classList.add("hidden")}const u={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")},w={message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"},S={message:"Please enter a search query.",position:"topRight"},M={message:"Sorry, something went wrong. Please try again later.",position:"topRight"};u.form.addEventListener("submit",function(e){e.preventDefault();const r=new FormData(u.form),s=String(r.get("search-text")??"").trim();if(!s){i.warning(S);return}b(),q(),m(s).then(n=>P(n)).catch(()=>{i.error(M)}).finally(()=>v())});function P(e){const r=e.hits;if(r.length===0){i.error(w);return}g(r)}
//# sourceMappingURL=index.js.map
