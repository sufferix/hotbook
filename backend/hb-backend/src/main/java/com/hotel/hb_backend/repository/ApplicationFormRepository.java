package com.hotel.hb_backend.repository;

import com.hotel.hb_backend.entity.ApplicationForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ApplicationFormRepository extends JpaRepository<ApplicationForm, Long> {
    List<ApplicationForm> findByProcessed(boolean processed);
    @Query("SELECT f FROM ApplicationForm f WHERE f.processed IS NULL")
    List<ApplicationForm> findUnprocessedApplications();
}

