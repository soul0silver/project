package com.demo.repository;

import com.demo.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepo extends CrudRepository<User,Integer> {

    @Query(value = "select u.* from user_role us," +
                    "user u, " +
                    "role r " +
                    "where us.uid=u.uid and r.rid=us.rid and u.username=:username",nativeQuery = true)
    User findUsername(@Param("username") String username);
    @Query(value = "select r.rname from user_role us," +
            "user u, " +
            "role r " +
            "where us.uid=u.uid and r.rid=us.rid and u.username=:username",nativeQuery = true)
    List<String> findRoles(@Param("username") String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    @Modifying
    @Transactional
    @Query(value = "insert into user_role(uid,rid) values (:uid,:rid)",nativeQuery = true)
    void userRole(@Param("uid") int uid, @Param("rid") int rid);
    User findByEmail(String email);

}
