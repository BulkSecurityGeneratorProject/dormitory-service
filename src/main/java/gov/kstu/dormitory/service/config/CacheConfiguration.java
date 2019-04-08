package gov.kstu.dormitory.service.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(gov.kstu.dormitory.service.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.Request.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.DicTypeOfTrouble.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.DicTypeOfTrouble.class.getName() + ".requests", jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.DicStudentGroup.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.DicFaculty.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.DicFaculty.class.getName() + ".dicStudentGroups", jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.DicRoom.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.DicDormitory.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.Announcement.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.JhiUser.class.getName(), jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.JhiUser.class.getName() + ".requests", jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.JhiUser.class.getName() + ".dicDormitories", jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.JhiUser.class.getName() + ".dicRooms", jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.JhiUser.class.getName() + ".announcements", jcacheConfiguration);
            cm.createCache(gov.kstu.dormitory.service.domain.JhiUser.class.getName() + ".dicStudentGroups", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
